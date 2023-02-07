# Touch SDK Web

![npm](https://img.shields.io/npm/v/touch-sdk)
![npm bundle size](https://img.shields.io/bundlephobia/min/touch-sdk)
![NPM](https://img.shields.io/npm/l/touch-sdk)
![npm downloads](https://img.shields.io/npm/dm/touch-sdk)
![Discord](https://img.shields.io/discord/869474617729875998)

Connects to Port 6 Touch SDK compatible Bluetooth devices – like [this WearOS app](https://play.google.com/store/apps/details?id=io.port6.watchbridge).

## Importing (URL)

```html
<script src="https://cdn.jsdelivr.net/npm/touch-sdk@0.4.3/dist/main.js"></script>
```

```javascript
const Watch = TouchSDK.Watch
```

## Importing (NPM)
```sh
npm install touch-sdk
```

```javascript
import { Watch } from 'touch-sdk'
```

## Example using URL import

```javascript
<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/touch-sdk@0.4.3/dist/main.js"></script>
    </head>
    <body>
        <script>
            const watch = new TouchSDK.Watch()

            const connectButton = watch.createConnectButton()
            document.body.appendChild(connectButton)

            watch.addEventListener('tap', () => {
                console.log('tap')
            })
        </script>
    </body>
</html>
```

## Reference

### Connection

#### `watch.createConnectButton`

Returns a button element with the following properties:
- `onclick` calls `watch.requestConnection`
- Text: Connect Touch SDK Controller
- Class (for CSS): `touch-sdk-connect-button`
- When the user selects a Touch SDK compatible device, the button is hidden.
- When the watch disconnects, the button is shown again.

This function does not add the button to the DOM.

#### `watch.requestConnection`
Can only be called as a result of a user action, for example a button click. Otherwise doesn't do anything.

```javascript
watch.requestConnection().then(() => {
    console.log('connected')
}, error => {
    alert(error.message)
})
```

### Input events

#### Gesture prediction

```javascript
watch.addEventListener('tap', (event) => {
    console.log('tap')
})
```

#### Ray casting (arm direction)
```javascript
watch.addEventListener('armdirectionchanged', event => {
    const { dx, dy } = event.detail
    console.log(dx, dy)
})
```

#### Raw motion (IMU)

All applicable units are SI-based.

##### Acceleration
```javascript
watch.addEventListener('accelerationchanged', (event) => {
    const { x, y, z } = event.detail
    console.log(x, y, z)
})
```

##### Rotation (gyroscope)
```javascript
watch.addEventListener('angularvelocitychanged', (event) => {
    const { x, y, z } = event.detail
    console.log(x, y, z)
})
```

##### Gravity Vector
```javascript
watch.addEventListener('gravityvectorchanged', (event) => {
    const { x, y, z } = event.detail
    console.log(x, y, z)
})
```

##### Orientation (quaternion)
```javascript
watch.addEventListener('orientationchanged', (event) => {
    const { x, y, z, w } = event.detail
    console.log(x, y, z, w)
})
```

#### Touch Screen

##### Touch Start
```javascript
watch.addEventListener('touchstart', (event) => {
    const { x, y } = event.detail
    console.log(x, y)
})
```

##### Touch Move
```javascript
watch.addEventListener('touchmove', (event) => {
    const { x, y } = event.detail
    console.log(x, y)
})
```

##### Touch End
```javascript
watch.addEventListener('touchend', (event) => {
    const { x, y } = event.detail
    console.log(x, y)
})
```

##### Touch Cancel
For example the user swiped from the edge of the screen, and triggered an operating system gesture. Usually `touchcancel` should be handled the same way as `touchend`.
```javascript
watch.addEventListener('touchcancel', (event) => {
    const { x, y } = event.detail
    console.log(x, y)
})
```

#### Mechanical

##### Rotary Dial
```javascript
watch.addEventListener('rotary', (event) => {
    const { step } = event.detail
    console.log(step)
})
```

##### Button
In Wear OS this is the back button. Only clicks are registered, no button down and button up events.
```javascript
watch.addEventListener('button', (event) => {
    console.log('button')
})
```

### Output
#### Haptics
Intensity is between 0 and 1.
Length is milliseconds, between 0 and 5000.
```javascript
watch.triggerHaptics(intensity, length)
```

## Developing: build a new version
```
npm install
npm run build
npm publish
```