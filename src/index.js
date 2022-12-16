import { Update, InputUpdate } from './watch_protobuf.js'

const serviceUuids = {
    INTERACTION: '008e74d0-7bb3-4ac5-8baf-e5e372cced76',
    PROTOBUF: 'f9d60370-5325-4c64-b874-a68c7c555bad'
}

const characteristicUuids = {
    PROTOBUF_OUTPUT: 'f9d60371-5325-4c64-b874-a68c7c555bad',
    PROTOBUF_INPUT: 'f9d60372-5325-4c64-b874-a68c7c555bad',
    PROTOBUF_INFO: 'f9d60373-5325-4c64-b874-a68c7c555bad'
}

export class Watch extends EventTarget {
    constructor() {
        super()
    }

    requestConnection = async () => {
        if (!navigator.bluetooth) {
            let errorMessage
            if (navigator.userAgent.indexOf('Chrome') != -1) {
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
                this._gattServer = gattServer
                this._subscribeToNotifications()
            })
            return this
        })
    }

    disconnect = () => {
        this.device.gatt.disconnect()
    }

    _subscribeToNotifications() {
        this.gattServer.getPrimaryService(serviceUuids.PROTOBUF).then(service => {
            service.getCharacteristic(characteristicUuids.PROTOBUF_OUTPUT).then(characteristic => {
                characteristic.addEventListener('characteristicvaluechanged', gattEvent => {
                    const dataView = gattEvent.target.value
                    const uints = new Uint8Array(dataView.buffer)
                    const messageObject = Update.decode(uints)

                    this._dispatchProtobufEvents(messageObject)

                })
                characteristic.startNotifications()
            })
        })
    }

    _dispatchProtobufEvents = (message) => {
        for (const gesture of message.gestures) {
            if (gesture.type == 1) {
                this.dispatchEvent(new CustomEvent('tap'))
            }
        }

        for (const rotaryEvent of message.rotaryEvents) {
            this.dispatchEvent(new CustomEvent('rotary', {detail: rotaryEvent.step}))
        }

        for (const touchEvent of message.touchEvents) {
            const type = touchEvent.type

            const eventName = (() => {
                if (type === 1) return 'touchstart'
                if (type === 2) return 'touchend'
                if (type === 3) return 'touchmove'
                if (type === 4) return 'touchcancel'
                else return ''
            })()

            if (eventName != '')
                this.dispatchEvent(new CustomEvent(eventName, {detail: touchEvent.coords}))
        }

        for (const buttonEvent of message.buttonEvents) {
            this.dispatchEvent(new CustomEvent('button', {detail: buttonEvent.id}))
        }

        if (message.sensorFrames.length > 0) {
            const frame = message.sensorFrames.slice(-1)[0]

            this.dispatchEvent(new CustomEvent('accelerationchanged', {detail: frame.acc}))
            this.dispatchEvent(new CustomEvent('gravityvectorchanged', {detail: frame.grav}))
            this.dispatchEvent(new CustomEvent('angularvelocitychanged', {detail: frame.gyro}))
            this.dispatchEvent(new CustomEvent('orientationchanged', {detail: frame.quat}))
        }

        for (const signal of message.signals) {
            if (signal == 1) {
                this.gattServer.disconnect()
            }
        }

    }

    triggerHaptics(intensity, length) {
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
}
