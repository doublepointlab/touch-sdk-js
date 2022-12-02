//import { load } from 'protobufjs'
import { Update } from './watch_output.js'

const serviceUuids = {
    SENSOR: '4b574af0-72d7-45d2-a1bb-23cd0ec20c57',
    FEEDBACK: '42926760-277c-4298-acfe-226b8d1c8c88',
    INTERACTION: '008e74d0-7bb3-4ac5-8baf-e5e372cced76',
    DISCONNECT: 'e23625a0-a6b6-4aa5-a1ad-b9c5d9158363',
    DATAFRAME: '4c574af0-72d7-45d2-a1bb-23cd0ec20c57',
    PROTOBUF: 'f9d60370-5325-4c64-b874-a68c7c555bad'
}

const characteristicUuids = {

    // Sensor Service
    GYRO: '4b574af1-72d7-45d2-a1bb-23cd0ec20c57',
    ACC: '4b574af2-72d7-45d2-a1bb-23cd0ec20c57',
    GRAV: '4b574af3-72d7-45d2-a1bb-23cd0ec20c57',
    QUAT: '4b574af4-72d7-45d2-a1bb-23cd0ec20c57',

    // Feedback Service
    HAPTICS: '42926761-277c-4298-acfe-226b8d1c8c88',

    // Interaction Service
    GESTURE: '008e74d1-7bb3-4ac5-8baf-e5e372cced76',
    TOUCHSCREEN: '008e74d2-7bb3-4ac5-8baf-e5e372cced76',
    PHYSICAL: '008e74d3-7bb3-4ac5-8baf-e5e372cced76', // rotary & button

    // Disconnect Service
    DISCONNECT: 'e23625a1-a6b6-4aa5-a1ad-b9c5d9158363',

    // Dataframe Service
    DATAFRAME: '4c574af1-72d7-45d2-a1bb-23cd0ec20c57',

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

        //this.linkNotifications(serviceUuids.SENSOR, characteristicUuids.ACC, 'accelerationchanged', bytesToFloatArray)
        //this.linkNotifications(serviceUuids.SENSOR, characteristicUuids.GYRO, 'angularvelocitychanged', bytesToFloatArray)
        //this.linkNotifications(serviceUuids.SENSOR, characteristicUuids.GRAV, 'gravityvectorchanged', bytesToFloatArray)
        //this.linkNotifications(serviceUuids.SENSOR, characteristicUuids.QUAT, 'orientationchanged', bytesToFloatArray)

        //this.linkNotifications(serviceUuids.DATAFRAME, characteristicUuids.DATAFRAME,
        //    'accelerationchanged', data => { return bytesToFloatArray(data).slice(0, 3) })

        //this.linkNotifications(serviceUuids.DATAFRAME, characteristicUuids.DATAFRAME,
        //    'gravityvectorchanged', data => { return bytesToFloatArray(data).slice(3, 6) })

        //this.linkNotifications(serviceUuids.DATAFRAME, characteristicUuids.DATAFRAME,
        //    'angularvelocitychanged', data => { return bytesToFloatArray(data).slice(6, 9) })

        //this.linkNotifications(serviceUuids.DATAFRAME, characteristicUuids.DATAFRAME,
        //    'orientationchanged', data => { return bytesToFloatArray(data).slice(9, 13) })

        this.linkProtobufNotifications(serviceUuids.PROTOBUF, characteristicUuids.PROTOBUF_OUTPUT)

        //this.linkNotifications(
        //    serviceUuids.INTERACTION,
        //    characteristicUuids.GESTURE,
        //    data => {
        //        const type = data.getUint8(0)
        //        if (type === 1) return 'tap'
        //        if (type === 2) return 'clench'
        //    },
        //    data => null
        //)

        //this.linkNotifications(
        //    serviceUuids.INTERACTION,
        //    characteristicUuids.TOUCHSCREEN,
        //    data => {
        //        const type = data.getUint8(0)
        //        if (type === 0) return 'touchstart'
        //        if (type === 1) return 'touchend'
        //        if (type === 2) return 'touchmove'
        //    },
        //    data => ({
        //        x: data.getFloat32(1),
        //        y: data.getFloat32(5)
        //    })
        //)

        //this.linkNotifications(
        //    serviceUuids.INTERACTION,
        //    characteristicUuids.PHYSICAL,
        //    data => {
        //        const type = data.getUint8(0)
        //        if (type === 0) return 'rotary'
        //        if (type === 1) return 'button'
        //    },
        //    data => data.getUint8(1)
        //)

        // This doesn't do anything with the current watch app, because it will die before having a chance to
        // send the disconnect signal
        this.gattServer.getPrimaryService(serviceUuids.DISCONNECT).then(service => {
            service.getCharacteristic(characteristicUuids.DISCONNECT).then(characteristic => {
                characteristic.addEventListener('characteristicvaluechanged', gattEvent => {
                    if (gattEvent.target.value.getUint8(0) === 0) {
                        this.gattServer.disconnect()
                    }
                })
            })
        })
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
                        console.log(messageObject)
                    })
                    characteristic.startNotifications()
                })
            })



    }

    linkNotifications = (serviceUUID, characteristicUUID, eventNameGenerator, unpacker) => {
        this.gattServer.getPrimaryService(serviceUUID).then(service => {
            service.getCharacteristic(characteristicUUID).then(characteristic => {
                characteristic.addEventListener('characteristicvaluechanged', gattEvent => {

                    // Some characteristic updates will be dispatched under different event names
                    // depending on the payload (e.g. type value) -> eventNameGenerator is a function.
                    //
                    // Other characterstic updates have only one event name -> eventNameGenerator is a string.
                    let eventName = eventNameGenerator

                    if (typeof eventNameGenerator === 'function') {
                        eventName = eventNameGenerator(gattEvent.target.value)

                        if (!eventName) {
                            // If the generator returns a falsy value, no events should be dispatched
                            return
                        }
                    }

                    const event = new CustomEvent(eventName, {
                        detail: unpacker(gattEvent.target.value)
                    })
                    this.dispatchEvent(event)
                })
                characteristic.startNotifications()
            })
        }).catch(error => { console.log(error.message) })
    }

    triggerHaptics(intensity, length) {
        const saneLength = Math.max(Math.min(length, 5000), 0)
        const saneIntensity = Math.max(Math.min(intensity, 1.0), 0.0)
        const discretizedIntensity = Math.round(255 * saneIntensity)

        this.gattServer.getPrimaryService(serviceUuids.FEEDBACK).then(service => {
            service.getCharacteristic(characteristicUuids.HAPTICS).then(characteristic => {
                const value = new ArrayBuffer(6)
                const valueView = new DataView(value, 0, 6)

                valueView.setUint8(0, 0)
                valueView.setInt32(1, saneLength)
                valueView.setUint8(5, discretizedIntensity)

                characteristic.writeValueWithResponse(value)
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
        serviceUuids.SENSOR,
        serviceUuids.DATAFRAME,
        serviceUuids.FEEDBACK,
        serviceUuids.DISCONNECT,
        serviceUuids.PROTOBUF
    ]

    return navigator.bluetooth.requestDevice({ filters, optionalServices })
    .then(device => new Watch(device))
}
