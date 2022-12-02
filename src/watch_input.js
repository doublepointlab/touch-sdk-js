// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.HapticEvent = (function() {

    /**
     * Properties of a HapticEvent.
     * @exports IHapticEvent
     * @interface IHapticEvent
     * @property {HapticEvent.HapticType|null} [type] HapticEvent type
     * @property {number|null} [intensity] HapticEvent intensity
     * @property {number|null} [length] HapticEvent length
     */

    /**
     * Constructs a new HapticEvent.
     * @exports HapticEvent
     * @classdesc Represents a HapticEvent.
     * @implements IHapticEvent
     * @constructor
     * @param {IHapticEvent=} [properties] Properties to set
     */
    function HapticEvent(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * HapticEvent type.
     * @member {HapticEvent.HapticType} type
     * @memberof HapticEvent
     * @instance
     */
    HapticEvent.prototype.type = 0;

    /**
     * HapticEvent intensity.
     * @member {number} intensity
     * @memberof HapticEvent
     * @instance
     */
    HapticEvent.prototype.intensity = 0;

    /**
     * HapticEvent length.
     * @member {number} length
     * @memberof HapticEvent
     * @instance
     */
    HapticEvent.prototype.length = 0;

    /**
     * Creates a new HapticEvent instance using the specified properties.
     * @function create
     * @memberof HapticEvent
     * @static
     * @param {IHapticEvent=} [properties] Properties to set
     * @returns {HapticEvent} HapticEvent instance
     */
    HapticEvent.create = function create(properties) {
        return new HapticEvent(properties);
    };

    /**
     * Encodes the specified HapticEvent message. Does not implicitly {@link HapticEvent.verify|verify} messages.
     * @function encode
     * @memberof HapticEvent
     * @static
     * @param {IHapticEvent} message HapticEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HapticEvent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
        if (message.intensity != null && Object.hasOwnProperty.call(message, "intensity"))
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.intensity);
        if (message.length != null && Object.hasOwnProperty.call(message, "length"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.length);
        return writer;
    };

    /**
     * Encodes the specified HapticEvent message, length delimited. Does not implicitly {@link HapticEvent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof HapticEvent
     * @static
     * @param {IHapticEvent} message HapticEvent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    HapticEvent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a HapticEvent message from the specified reader or buffer.
     * @function decode
     * @memberof HapticEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {HapticEvent} HapticEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HapticEvent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.HapticEvent();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.type = reader.int32();
                    break;
                }
            case 2: {
                    message.intensity = reader.float();
                    break;
                }
            case 3: {
                    message.length = reader.int32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a HapticEvent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof HapticEvent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {HapticEvent} HapticEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    HapticEvent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a HapticEvent message.
     * @function verify
     * @memberof HapticEvent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    HapticEvent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
                break;
            }
        if (message.intensity != null && message.hasOwnProperty("intensity"))
            if (typeof message.intensity !== "number")
                return "intensity: number expected";
        if (message.length != null && message.hasOwnProperty("length"))
            if (!$util.isInteger(message.length))
                return "length: integer expected";
        return null;
    };

    /**
     * Creates a HapticEvent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof HapticEvent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {HapticEvent} HapticEvent
     */
    HapticEvent.fromObject = function fromObject(object) {
        if (object instanceof $root.HapticEvent)
            return object;
        var message = new $root.HapticEvent();
        switch (object.type) {
        default:
            if (typeof object.type === "number") {
                message.type = object.type;
                break;
            }
            break;
        case "CANCEL":
        case 0:
            message.type = 0;
            break;
        case "ONESHOT":
        case 1:
            message.type = 1;
            break;
        }
        if (object.intensity != null)
            message.intensity = Number(object.intensity);
        if (object.length != null)
            message.length = object.length | 0;
        return message;
    };

    /**
     * Creates a plain object from a HapticEvent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof HapticEvent
     * @static
     * @param {HapticEvent} message HapticEvent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    HapticEvent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.type = options.enums === String ? "CANCEL" : 0;
            object.intensity = 0;
            object.length = 0;
        }
        if (message.type != null && message.hasOwnProperty("type"))
            object.type = options.enums === String ? $root.HapticEvent.HapticType[message.type] === undefined ? message.type : $root.HapticEvent.HapticType[message.type] : message.type;
        if (message.intensity != null && message.hasOwnProperty("intensity"))
            object.intensity = options.json && !isFinite(message.intensity) ? String(message.intensity) : message.intensity;
        if (message.length != null && message.hasOwnProperty("length"))
            object.length = message.length;
        return object;
    };

    /**
     * Converts this HapticEvent to JSON.
     * @function toJSON
     * @memberof HapticEvent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    HapticEvent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for HapticEvent
     * @function getTypeUrl
     * @memberof HapticEvent
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    HapticEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/HapticEvent";
    };

    /**
     * HapticType enum.
     * @name HapticEvent.HapticType
     * @enum {number}
     * @property {number} CANCEL=0 CANCEL value
     * @property {number} ONESHOT=1 ONESHOT value
     */
    HapticEvent.HapticType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CANCEL"] = 0;
        values[valuesById[1] = "ONESHOT"] = 1;
        return values;
    })();

    return HapticEvent;
})();

$root.InputUpdate = (function() {

    /**
     * Properties of an InputUpdate.
     * @exports IInputUpdate
     * @interface IInputUpdate
     * @property {IHapticEvent|null} [hapticEvent] InputUpdate hapticEvent
     */

    /**
     * Constructs a new InputUpdate.
     * @exports InputUpdate
     * @classdesc Represents an InputUpdate.
     * @implements IInputUpdate
     * @constructor
     * @param {IInputUpdate=} [properties] Properties to set
     */
    function InputUpdate(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * InputUpdate hapticEvent.
     * @member {IHapticEvent|null|undefined} hapticEvent
     * @memberof InputUpdate
     * @instance
     */
    InputUpdate.prototype.hapticEvent = null;

    /**
     * Creates a new InputUpdate instance using the specified properties.
     * @function create
     * @memberof InputUpdate
     * @static
     * @param {IInputUpdate=} [properties] Properties to set
     * @returns {InputUpdate} InputUpdate instance
     */
    InputUpdate.create = function create(properties) {
        return new InputUpdate(properties);
    };

    /**
     * Encodes the specified InputUpdate message. Does not implicitly {@link InputUpdate.verify|verify} messages.
     * @function encode
     * @memberof InputUpdate
     * @static
     * @param {IInputUpdate} message InputUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InputUpdate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.hapticEvent != null && Object.hasOwnProperty.call(message, "hapticEvent"))
            $root.HapticEvent.encode(message.hapticEvent, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified InputUpdate message, length delimited. Does not implicitly {@link InputUpdate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof InputUpdate
     * @static
     * @param {IInputUpdate} message InputUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    InputUpdate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an InputUpdate message from the specified reader or buffer.
     * @function decode
     * @memberof InputUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {InputUpdate} InputUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InputUpdate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.InputUpdate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.hapticEvent = $root.HapticEvent.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an InputUpdate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof InputUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {InputUpdate} InputUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    InputUpdate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an InputUpdate message.
     * @function verify
     * @memberof InputUpdate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    InputUpdate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.hapticEvent != null && message.hasOwnProperty("hapticEvent")) {
            var error = $root.HapticEvent.verify(message.hapticEvent);
            if (error)
                return "hapticEvent." + error;
        }
        return null;
    };

    /**
     * Creates an InputUpdate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof InputUpdate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {InputUpdate} InputUpdate
     */
    InputUpdate.fromObject = function fromObject(object) {
        if (object instanceof $root.InputUpdate)
            return object;
        var message = new $root.InputUpdate();
        if (object.hapticEvent != null) {
            if (typeof object.hapticEvent !== "object")
                throw TypeError(".InputUpdate.hapticEvent: object expected");
            message.hapticEvent = $root.HapticEvent.fromObject(object.hapticEvent);
        }
        return message;
    };

    /**
     * Creates a plain object from an InputUpdate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof InputUpdate
     * @static
     * @param {InputUpdate} message InputUpdate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    InputUpdate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.hapticEvent = null;
        if (message.hapticEvent != null && message.hasOwnProperty("hapticEvent"))
            object.hapticEvent = $root.HapticEvent.toObject(message.hapticEvent, options);
        return object;
    };

    /**
     * Converts this InputUpdate to JSON.
     * @function toJSON
     * @memberof InputUpdate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    InputUpdate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for InputUpdate
     * @function getTypeUrl
     * @memberof InputUpdate
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    InputUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/InputUpdate";
    };

    return InputUpdate;
})();