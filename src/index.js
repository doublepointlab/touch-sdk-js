import { Update, InputUpdate, Info } from './watch_protobuf.js'

const serviceUuids = {
    INTERACTION: '008e74d0-7bb3-4ac5-8baf-e5e372cced76',
    PROTOBUF: 'f9d60370-5325-4c64-b874-a68c7c555bad'
}

const characteristicUuids = {
    PROTOBUF_OUTPUT: 'f9d60371-5325-4c64-b874-a68c7c555bad',
    PROTOBUF_INPUT: 'f9d60372-5325-4c64-b874-a68c7c555bad',
    PROTOBUF_INFO: 'f9d60373-5325-4c64-b874-a68c7c555bad'
}

const handedness = [
    "none",
    "right",
    "left"
]

export class Watch extends EventTarget {
    constructor() {
        super()
        this._accepted = false
        this._hand = handedness[0]
    }

    createConnectButton = () => {
        const button = document.createElement('button')
        button.innerText = 'Connect Touch SDK Controller'
        button.classList.add('touch-sdk-connect-button')

        button.addEventListener('click', () => this.requestConnection())

        this.addEventListener('device-selected', () => {
            button.style.display = 'none'
        })

        this.addEventListener('disconnected', () => {
            button.style.display = 'inline-block' // default display style for a button
        })

        return button
    }

    requestConnection = async () => {
        if (!navigator.bluetooth) {
            let errorMessage
            if (navigator.userAgent.indexOf('Chrome') !== -1) {
                // Browser probably supports Web Bluetooth, but it is not enabled.
                errorMessage = 'Web Bluetooth is disabled. Please enable it from chrome://flags'
            } else {
                errorMessage = 'Web Bluetooth is not available, and likely not supported' +
                               ' on your browser. Please try a Chrome-based browser.'
            }
            return Promise.reject(new Error(errorMessage))
        }

        const filters = [{ services: [serviceUuids.INTERACTION]}]
        const optionalServices = [
            serviceUuids.PROTOBUF
        ]

        return navigator.bluetooth.requestDevice({ filters, optionalServices })
        .then(device => {
            this._device = device

            this.device.addEventListener('gattserverdisconnected', () => {
                const event = new CustomEvent('disconnected')
                this.dispatchEvent(event)
            })

            this.device.gatt.connect()
            .then(gattServer => {
                // The watch receives a connection request, but might not accept it
                const event = new CustomEvent('device-selected')
                this.dispatchEvent(event)
                this._gattServer = gattServer
                this._subscribeToNotifications()
            })
            return this
        })
    }

    disconnect = () => {
        this.device.gatt.disconnect()
    }

    _subscribeToNotifications = () => {
        this.gattServer.getPrimaryService(serviceUuids.PROTOBUF).then(service => {
            service.getCharacteristic(characteristicUuids.PROTOBUF_OUTPUT).then(characteristic => {
                characteristic.addEventListener('characteristicvaluechanged', gattEvent => {
                    const dataView = gattEvent.target.value
                    const uints = new Uint8Array(dataView.buffer)
                    const messageObject = Update.decode(uints)

                    this.dispatchProtobufEvents(messageObject)

                })
                characteristic.startNotifications()
            })
        })
    }

    dispatchProtobufEvents = (message) => {
        for (const gesture of message.gestures) {
            if (gesture.type === 1) {
                this.dispatchEvent(new CustomEvent('tap'))
            }
        }

        for (const rotaryEvent of message.rotaryEvents) {
            this.dispatchEvent(new CustomEvent('rotary', {detail: rotaryEvent.step}))
        }

        for (const touchEvent of message.touchEvents) {
            // if type is none of the known ones, eventName will be undefined
            const eventName = ({
                1: 'touchstart',
                2: 'touchend',
                3: 'touchmove',
                4: 'touchcancel'
            })[touchEvent.type]

            if (eventName)
                this.dispatchEvent(new CustomEvent(eventName, {detail: touchEvent.coords}))
        }

        for (const buttonEvent of message.buttonEvents) {
            this.dispatchEvent(new CustomEvent('button', {detail: buttonEvent.id}))
        }

        for (const frame of message.sensorFrames) {
            this.dispatchEvent(new CustomEvent('accelerationchanged', {detail: frame.acc}))
            this.dispatchEvent(new CustomEvent('gravityvectorchanged', {detail: frame.grav}))
            this.dispatchEvent(new CustomEvent('angularvelocitychanged', {detail: frame.gyro}))
            this.dispatchEvent(new CustomEvent('orientationchanged', {detail: frame.quat}))
            this.dispatchRayCasting(frame)
        }

        if (message.info) {
            const handRaw = message.info.hand
            if (handRaw > 0 && handRaw < handedness.length) {
                const hand = handedness[handRaw]
                this._hand = hand
                this.dispatchEvent(
                    new CustomEvent('handednesschanged', {detail: hand})
                )
            }
        }

        if (message.signals.includes(1)) {
            this.gattServer.disconnect()
        } else if (!this._accepted) {
            this._fetchInfo()
            this._accepted = true
        }

    }

    _fetchInfo = () => {
        this.gattServer.getPrimaryService(serviceUuids.PROTOBUF).then(service => {
            service.getCharacteristic(characteristicUuids.PROTOBUF_OUTPUT).then(characteristic => {
                characteristic.readValue().then(data => {
                    const uints = new Uint8Array(data.buffer)
                    const handRaw = Update.decode(uints).info.hand

                    if (handRaw >= 0 && handRaw < handedness.length) {
                        this._hand = handedness[handRaw]
                    }
                })
            })
        })
    }

    dispatchRayCasting = (frame) => {
        const scaling = 1
        const acceleration = 0

        // Assumes right hand if this.hand === 'none'
        const handednessScale = this.hand === 'left' ? -1 : 1

        const { x, y, z } = frame.grav
        const r = Math.sqrt(x*x + y*y + z*z)
        const gravityDirection = {
            x: x/r,
            y: y/r,
            z: z/r
        }
        const vx = -frame.gyro.z // right = +
        const vy = -frame.gyro.y // down = +

        const vr = Math.sqrt(vx*vx + vy*vy)

        const dx = scaling * vx * Math.pow(vr, acceleration)
        const dy = scaling * vy * Math.pow(vr, acceleration)

        const rayX = dx * gravityDirection.z + dy * gravityDirection.y
        const rayY = handednessScale * (dy * gravityDirection.z - dx * gravityDirection.y)

        this.dispatchEvent(new CustomEvent('armdirectionchanged', {detail:
            {
                dx: rayX,
                dy: rayY
            }
        }))

        // raycasting delta
        // ray angle speed
        // wrist pointing direction
        // raycast move
    }

    triggerHaptics = (intensity, length) => {
        const saneLength = Math.max(Math.min(length, 5000), 0)
        const saneIntensity = Math.max(Math.min(intensity, 1.0), 0.0)

        this.gattServer.getPrimaryService(serviceUuids.PROTOBUF).then(service => {
            service.getCharacteristic(characteristicUuids.PROTOBUF_INPUT).then(characteristic => {

                const inputUpdate = InputUpdate.create(
                    {hapticEvent: {type: 1, intensity: saneIntensity, length: saneLength}}
                )

                const data = InputUpdate.encode(inputUpdate).finish()
                const dataView = new DataView(data.buffer.slice(0, data.length))

                characteristic.writeValueWithResponse(dataView)
            })
        })

    }

    get device() { return this._device }
    get gattServer() { return this._gattServer }
    get hand() { return this._hand }
}
