# Touch SDK Web

![npm](https://img.shields.io/npm/v/touch-sdk)
![npm bundle size](https://img.shields.io/bundlephobia/min/touch-sdk)
![NPM](https://img.shields.io/npm/l/touch-sdk)
![npm downloads](https://img.shields.io/npm/dm/touch-sdk)
![Discord](https://img.shields.io/discord/869474617729875998)

Connects to Port 6 Touch SDK compatible Bluetooth devices – like [this WearOS app](https://play.google.com/store/apps/details?id=io.port6.watchbridge).

## Installation
```sh
npm install touch-sdk
```

## Example usage (incomplete)

Please note that `watch.requestConnection()` needs to happen as a result of a user action, for example a button click.

```javascript
import { getWatch } from 'touch-sdk'

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