/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

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
    
    $root.ClientInfo = (function() {
    
        /**
         * Properties of a ClientInfo.
         * @exports IClientInfo
         * @interface IClientInfo
         * @property {string|null} [deviceModel] ClientInfo deviceModel
         * @property {string|null} [deviceName] ClientInfo deviceName
         * @property {string|null} [deviceType] ClientInfo deviceType
         * @property {string|null} [deviceId] ClientInfo deviceId
         * @property {string|null} [appName] ClientInfo appName
         * @property {string|null} [appId] ClientInfo appId
         * @property {string|null} [description] ClientInfo description
         */
    
        /**
         * Constructs a new ClientInfo.
         * @exports ClientInfo
         * @classdesc Represents a ClientInfo.
         * @implements IClientInfo
         * @constructor
         * @param {IClientInfo=} [properties] Properties to set
         */
        function ClientInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * ClientInfo deviceModel.
         * @member {string} deviceModel
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.deviceModel = "";
    
        /**
         * ClientInfo deviceName.
         * @member {string} deviceName
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.deviceName = "";
    
        /**
         * ClientInfo deviceType.
         * @member {string} deviceType
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.deviceType = "";
    
        /**
         * ClientInfo deviceId.
         * @member {string} deviceId
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.deviceId = "";
    
        /**
         * ClientInfo appName.
         * @member {string} appName
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.appName = "";
    
        /**
         * ClientInfo appId.
         * @member {string} appId
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.appId = "";
    
        /**
         * ClientInfo description.
         * @member {string} description
         * @memberof ClientInfo
         * @instance
         */
        ClientInfo.prototype.description = "";
    
        /**
         * Creates a new ClientInfo instance using the specified properties.
         * @function create
         * @memberof ClientInfo
         * @static
         * @param {IClientInfo=} [properties] Properties to set
         * @returns {ClientInfo} ClientInfo instance
         */
        ClientInfo.create = function create(properties) {
            return new ClientInfo(properties);
        };
    
        /**
         * Encodes the specified ClientInfo message. Does not implicitly {@link ClientInfo.verify|verify} messages.
         * @function encode
         * @memberof ClientInfo
         * @static
         * @param {IClientInfo} message ClientInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.deviceModel != null && Object.hasOwnProperty.call(message, "deviceModel"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.deviceModel);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceName);
            if (message.deviceType != null && Object.hasOwnProperty.call(message, "deviceType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.deviceType);
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.deviceId);
            if (message.appName != null && Object.hasOwnProperty.call(message, "appName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.appName);
            if (message.appId != null && Object.hasOwnProperty.call(message, "appId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.appId);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.description);
            return writer;
        };
    
        /**
         * Encodes the specified ClientInfo message, length delimited. Does not implicitly {@link ClientInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ClientInfo
         * @static
         * @param {IClientInfo} message ClientInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a ClientInfo message from the specified reader or buffer.
         * @function decode
         * @memberof ClientInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ClientInfo} ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.deviceModel = reader.string();
                        break;
                    }
                case 2: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 3: {
                        message.deviceType = reader.string();
                        break;
                    }
                case 4: {
                        message.deviceId = reader.string();
                        break;
                    }
                case 5: {
                        message.appName = reader.string();
                        break;
                    }
                case 6: {
                        message.appId = reader.string();
                        break;
                    }
                case 7: {
                        message.description = reader.string();
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
         * Decodes a ClientInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ClientInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ClientInfo} ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a ClientInfo message.
         * @function verify
         * @memberof ClientInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.deviceModel != null && message.hasOwnProperty("deviceModel"))
                if (!$util.isString(message.deviceModel))
                    return "deviceModel: string expected";
            if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                if (!$util.isString(message.deviceType))
                    return "deviceType: string expected";
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                if (!$util.isString(message.deviceId))
                    return "deviceId: string expected";
            if (message.appName != null && message.hasOwnProperty("appName"))
                if (!$util.isString(message.appName))
                    return "appName: string expected";
            if (message.appId != null && message.hasOwnProperty("appId"))
                if (!$util.isString(message.appId))
                    return "appId: string expected";
            if (message.description != null && message.hasOwnProperty("description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            return null;
        };
    
        /**
         * Creates a ClientInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ClientInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ClientInfo} ClientInfo
         */
        ClientInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.ClientInfo)
                return object;
            var message = new $root.ClientInfo();
            if (object.deviceModel != null)
                message.deviceModel = String(object.deviceModel);
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            if (object.deviceType != null)
                message.deviceType = String(object.deviceType);
            if (object.deviceId != null)
                message.deviceId = String(object.deviceId);
            if (object.appName != null)
                message.appName = String(object.appName);
            if (object.appId != null)
                message.appId = String(object.appId);
            if (object.description != null)
                message.description = String(object.description);
            return message;
        };
    
        /**
         * Creates a plain object from a ClientInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ClientInfo
         * @static
         * @param {ClientInfo} message ClientInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.deviceModel = "";
                object.deviceName = "";
                object.deviceType = "";
                object.deviceId = "";
                object.appName = "";
                object.appId = "";
                object.description = "";
            }
            if (message.deviceModel != null && message.hasOwnProperty("deviceModel"))
                object.deviceModel = message.deviceModel;
            if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                object.deviceName = message.deviceName;
            if (message.deviceType != null && message.hasOwnProperty("deviceType"))
                object.deviceType = message.deviceType;
            if (message.deviceId != null && message.hasOwnProperty("deviceId"))
                object.deviceId = message.deviceId;
            if (message.appName != null && message.hasOwnProperty("appName"))
                object.appName = message.appName;
            if (message.appId != null && message.hasOwnProperty("appId"))
                object.appId = message.appId;
            if (message.description != null && message.hasOwnProperty("description"))
                object.description = message.description;
            return object;
        };
    
        /**
         * Converts this ClientInfo to JSON.
         * @function toJSON
         * @memberof ClientInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * Gets the default type url for ClientInfo
         * @function getTypeUrl
         * @memberof ClientInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ClientInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ClientInfo";
        };
    
        return ClientInfo;
    })();
    
    $root.InputUpdate = (function() {
    
        /**
         * Properties of an InputUpdate.
         * @exports IInputUpdate
         * @interface IInputUpdate
         * @property {IHapticEvent|null} [hapticEvent] InputUpdate hapticEvent
         * @property {IClientInfo|null} [clientInfo] InputUpdate clientInfo
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
         * InputUpdate clientInfo.
         * @member {IClientInfo|null|undefined} clientInfo
         * @memberof InputUpdate
         * @instance
         */
        InputUpdate.prototype.clientInfo = null;
    
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
            if (message.clientInfo != null && Object.hasOwnProperty.call(message, "clientInfo"))
                $root.ClientInfo.encode(message.clientInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                case 2: {
                        message.clientInfo = $root.ClientInfo.decode(reader, reader.uint32());
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
            if (message.clientInfo != null && message.hasOwnProperty("clientInfo")) {
                var error = $root.ClientInfo.verify(message.clientInfo);
                if (error)
                    return "clientInfo." + error;
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
            if (object.clientInfo != null) {
                if (typeof object.clientInfo !== "object")
                    throw TypeError(".InputUpdate.clientInfo: object expected");
                message.clientInfo = $root.ClientInfo.fromObject(object.clientInfo);
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
            if (options.defaults) {
                object.hapticEvent = null;
                object.clientInfo = null;
            }
            if (message.hapticEvent != null && message.hasOwnProperty("hapticEvent"))
                object.hapticEvent = $root.HapticEvent.toObject(message.hapticEvent, options);
            if (message.clientInfo != null && message.hasOwnProperty("clientInfo"))
                object.clientInfo = $root.ClientInfo.toObject(message.clientInfo, options);
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

    return $root;
});
