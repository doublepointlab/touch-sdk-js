
class Orientation {

    constructor(quaternion) {
        this._quaternion = quaternion
        this._matrix = this._toMatrix(quaternion)
    }

    _toMatrix = (q) => {
        return [
            [1 - 2*(_q.y * _q.y + _q.z * _q.z), 2*(_q.x * _q.y - _q.z * _q.w), 2*(_q.x * _q.z + _q.y * _q.w)],
            [2*(_q.x * _q.y + _q.z * _q.w), 1 - 2*(_q.x * _q.x + _q.z * _q.z), 2*(_q.y * _q.z - _q.x * _q.w)],
            [2*(_q.x * _q.z - _q.y * _q.w), 2*(_q.y * _q.z + _q.x * _q.w), 1 - 2*(_q.x * _q.x + _q.y * _q.y)]
        ]
    }

    get x() { return this._quaternion.x }
    get y() { return this._quaternion.y }
    get z() { return this._quaternion.z }
    get w() { return this._quaternion.w }

    get matrix() { return this._matrix }

}
