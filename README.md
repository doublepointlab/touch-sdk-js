# Touch SDK

Connects to Port 6 Touch SDK compatible Bluetooth devices – like [this WearOS app](https://play.google.com/store/apps/details?id=io.port6.watchbridge).

## Installation
```sh
npm install touch-sdk
```

## Example usage (incomplete)

Please note that `watch.connect()` needs to happen as a result of a user action, for example a button click.

```javascript
import { getWatch } from 'touch-sdk'

const watch = new Watch()

watch.addEventListener('tap', () => {
    console.log('tap')
})

watch.connect().then(() => {
    console.log('connected')
}, error => {
    alert(error.message)
})
```