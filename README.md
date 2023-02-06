# Touch SDK Web

![npm](https://img.shields.io/npm/v/touch-sdk)
![npm bundle size](https://img.shields.io/bundlephobia/min/touch-sdk)
![NPM](https://img.shields.io/npm/l/touch-sdk)
![npm downloads](https://img.shields.io/npm/dm/touch-sdk)
![Discord](https://img.shields.io/discord/869474617729875998)

Connects to Port 6 Touch SDK compatible Bluetooth devices – like [this WearOS app](https://play.google.com/store/apps/details?id=io.port6.watchbridge).

## Importing (URL)

```html
<script src="https://cdn.jsdelivr.net/npm/touch-sdk@0.4.2/dist/main.js"></script>
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

## Example usage (incomplete)

Please note that `watch.requestConnection()` needs to happen as a result of a user action, for example a button click.

```javascript
const watch = new Watch()

watch.addEventListener('tap', () => {
    console.log('tap')
})

watch.requestConnection().then(() => {
    console.log('connected')
}, error => {
    alert(error.message)
})
```

### Ray casting (arm direction)
```javascript
watch.addEventListener('armdirectionchanged', event => {
    console.log(event.detail)
})
```

## Developing: build a new version
```
npm install
npm run build
npm publish
```