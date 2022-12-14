import { Update } from './watch_output.js'
import { InputUpdate, HapticEvent } from './watch_input.js'

const serviceUuids = {
    //SENSOR: '4b574af0-72d7-45d2-a1bb-23cd0ec20c57',
    //FEEDBACK: '42926760-277c-4298-acfe-226b8d1c8c88',
    INTERACTION: '008e74d0-7bb3-4ac5-8baf-e5e372cced76',
    //DISCONNECT: 'e23625a0-a6b6-4aa5-a1ad-b9c5d9158363',
    //DATAFRAME: '4c574af0-72d7-45d2-a1bb-23cd0ec20c57',
    PROTOBUF: 'f9d60370-5325-4c64-b874-a68c7c555bad'
}

const characteristicUuids = {

    // Sensor Service
    //GYRO: '4b574af1-72d7-45d2-a1bb-23cd0ec20c57',
    //ACC: '4b574af2-72d7-45d2-a1bb-23cd0ec20c57',
    //GRAV: '4b574af3-72d7-45d2-a1bb-23cd0ec20c57',
    //QUAT: '4b574af4-72d7-45d2-a1bb-23cd0ec20c57',

    // Feedback Service
    //HAPTICS: '42926761-277c-4298-acfe-226b8d1c8c88',

    // Interaction Service
    //GESTURE: '008e74d1-7bb3-4ac5-8baf-e5e372cced76',
    //TOUCHSCREEN: '008e74d2-7bb3-4ac5-8baf-e5e372cced76',
    //PHYSICAL: '008e74d3-7bb3-4ac5-8baf-e5e372cced76', // rotary & button

    // Disconnect Service
    //DISCONNECT: 'e23625a1-a6b6-4aa5-a1ad-b9c5d9158363',

    // Dataframe Service
    //DATAFRAME: '4c574af1-72d7-45d2-a1bb-23cd0ec20c57',

    PROTOBUF_OUTPUT: 'f9d60371-5325-4c64-b874-a68c7c555bad',
    PROTOBUF_INPUT: 'f9d60372-5325-4c64-b874-a68c7c555bad',
    PROTOBUF_INFO: 'f9d60373-5325-4c64-b874-a68c7c555bad'

}



// struct.unpack
const bytesToFloatArray = bytes => {
    const result = []
    for (let i = 0; i < bytes.byteLength; i += 4) {
        result.push(bytes.getFloat32(i))
    }
    return result
}



class Watch extends EventTarget {
    constructor(device) {
        super()
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
    }

    _subscribeToNotifications() {


        this.linkProtobufNotifications(serviceUuids.PROTOBUF, characteristicUuids.PROTOBUF_OUTPUT)


        // This doesn't do anything with the current watch app, because it will die before having a chance to
        // send the disconnect signal
        //this.gattServer.getPrimaryService(serviceUuids.DISCONNECT).then(service => {
        //    service.getCharacteristic(characteristicUuids.DISCONNECT).then(characteristic => {
        //        characteristic.addEventListener('characteristicvaluechanged', gattEvent => {
        //            if (gattEvent.target.value.getUint8(0) === 0) {
        //                this.gattServer.disconnect()
        //            }
        //        })
        //    })
        //})
    }

    linkProtobufNotifications = (serviceUUID, characteristicUUID) => {

        this.gattServer.getPrimaryService(serviceUUID).then(service => {
            console.log(service)
            service.getCharacteristic(characteristicUUID).then(characteristic => {
            console.log(characteristic)
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

            //this.dispatchEvent(new CustomEvent('sensorschanged', {detail: frame.acc}))

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
        const discretizedIntensity = Math.round(255 * saneIntensity)


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



export const getWatch = async () => {
    if (!navigator.bluetooth) {
        let errorMessage
        if (navigator.userAgent.indexOf("Chrome") != -1) {
            // Browser probably supports Web Bluetooth, but it is not enabled.
            errorMessage = 'Web Bluetooth is disabled. Please enable it from chrome://flags'
        } else {
            errorMessage = 'Web Bluetooth is not available, and likely not supported' +
                           ' on your browser. Please try a Chrome-based browser.'
        }
        return Promise.reject(new Error(errorMessage))
    }

    const filters = [
        { services: [
            serviceUuids.INTERACTION,
        ]},
    ]
    const optionalServices = [
        serviceUuids.PROTOBUF
    ]

    return navigator.bluetooth.requestDevice({ filters, optionalServices })
    .then(device => new Watch(device))
}
