/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.EncMsgPack', null, global);
goog.exportSymbol('proto.EncMsgPack.EncArr', null, global);
goog.exportSymbol('proto.EncMsgPack.EncMsg', null, global);
goog.exportSymbol('proto.EncMsgPack.EncVal', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EncMsgPack = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.EncMsgPack.repeatedFields_, null);
};
goog.inherits(proto.EncMsgPack, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.EncMsgPack.displayName = 'proto.EncMsgPack';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.EncMsgPack.repeatedFields_ = [7,8,9,10,11,12];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EncMsgPack.prototype.toObject = function(opt_includeInstance) {
  return proto.EncMsgPack.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EncMsgPack} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.toObject = function(includeInstance, msg) {
  var f, obj = {
    startMsgs: jspb.Message.getFieldWithDefault(msg, 1, 0),
    startArrs: jspb.Message.getFieldWithDefault(msg, 2, 0),
    startStrs: jspb.Message.getFieldWithDefault(msg, 3, 0),
    startI32s: jspb.Message.getFieldWithDefault(msg, 4, 0),
    startDbls: jspb.Message.getFieldWithDefault(msg, 5, 0),
    startByts: jspb.Message.getFieldWithDefault(msg, 6, 0),
    msgsList: jspb.Message.toObjectList(msg.getMsgsList(),
    proto.EncMsgPack.EncMsg.toObject, includeInstance),
    arrsList: jspb.Message.toObjectList(msg.getArrsList(),
    proto.EncMsgPack.EncArr.toObject, includeInstance),
    strsList: jspb.Message.getRepeatedField(msg, 9),
    i32sList: jspb.Message.getRepeatedField(msg, 10),
    dblsList: jspb.Message.getRepeatedFloatingPointField(msg, 11),
    bytsList: jspb.Message.getRepeatedField(msg, 12)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EncMsgPack}
 */
proto.EncMsgPack.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EncMsgPack;
  return proto.EncMsgPack.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EncMsgPack} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EncMsgPack}
 */
proto.EncMsgPack.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartMsgs(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartArrs(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartStrs(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartI32s(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartDbls(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStartByts(value);
      break;
    case 7:
      var value = new proto.EncMsgPack.EncMsg;
      reader.readMessage(value,proto.EncMsgPack.EncMsg.deserializeBinaryFromReader);
      msg.addMsgs(value);
      break;
    case 8:
      var value = new proto.EncMsgPack.EncArr;
      reader.readMessage(value,proto.EncMsgPack.EncArr.deserializeBinaryFromReader);
      msg.addArrs(value);
      break;
    case 9:
      var value = /** @type {string} */ (reader.readString());
      msg.addStrs(value);
      break;
    case 10:
      var value = /** @type {!Array<number>} */ (reader.readPackedSint64());
      msg.setI32sList(value);
      break;
    case 11:
      var value = /** @type {!Array<number>} */ (reader.readPackedDouble());
      msg.setDblsList(value);
      break;
    case 12:
      var value = /** @type {!Array<number>} */ (reader.readPackedSint64());
      msg.setBytsList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EncMsgPack.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EncMsgPack.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EncMsgPack} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStartMsgs();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getStartArrs();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getStartStrs();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getStartI32s();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getStartDbls();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getStartByts();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
  f = message.getMsgsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      7,
      f,
      proto.EncMsgPack.EncMsg.serializeBinaryToWriter
    );
  }
  f = message.getArrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      8,
      f,
      proto.EncMsgPack.EncArr.serializeBinaryToWriter
    );
  }
  f = message.getStrsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      9,
      f
    );
  }
  f = message.getI32sList();
  if (f.length > 0) {
    writer.writePackedSint64(
      10,
      f
    );
  }
  f = message.getDblsList();
  if (f.length > 0) {
    writer.writePackedDouble(
      11,
      f
    );
  }
  f = message.getBytsList();
  if (f.length > 0) {
    writer.writePackedSint64(
      12,
      f
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EncMsgPack.EncVal = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.EncMsgPack.EncVal, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.EncMsgPack.EncVal.displayName = 'proto.EncMsgPack.EncVal';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EncMsgPack.EncVal.prototype.toObject = function(opt_includeInstance) {
  return proto.EncMsgPack.EncVal.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EncMsgPack.EncVal} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.EncVal.toObject = function(includeInstance, msg) {
  var f, obj = {
    vtype: jspb.Message.getFieldWithDefault(msg, 1, 0),
    vidx: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EncMsgPack.EncVal}
 */
proto.EncMsgPack.EncVal.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EncMsgPack.EncVal;
  return proto.EncMsgPack.EncVal.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EncMsgPack.EncVal} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EncMsgPack.EncVal}
 */
proto.EncMsgPack.EncVal.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVtype(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVidx(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EncMsgPack.EncVal.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EncMsgPack.EncVal.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EncMsgPack.EncVal} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.EncVal.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getVtype();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getVidx();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 vtype = 1;
 * @return {number}
 */
proto.EncMsgPack.EncVal.prototype.getVtype = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.EncMsgPack.EncVal.prototype.setVtype = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 vidx = 2;
 * @return {number}
 */
proto.EncMsgPack.EncVal.prototype.getVidx = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.EncMsgPack.EncVal.prototype.setVidx = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EncMsgPack.EncArr = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.EncMsgPack.EncArr.repeatedFields_, null);
};
goog.inherits(proto.EncMsgPack.EncArr, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.EncMsgPack.EncArr.displayName = 'proto.EncMsgPack.EncArr';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.EncMsgPack.EncArr.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EncMsgPack.EncArr.prototype.toObject = function(opt_includeInstance) {
  return proto.EncMsgPack.EncArr.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EncMsgPack.EncArr} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.EncArr.toObject = function(includeInstance, msg) {
  var f, obj = {
    valsList: jspb.Message.toObjectList(msg.getValsList(),
    proto.EncMsgPack.EncVal.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EncMsgPack.EncArr}
 */
proto.EncMsgPack.EncArr.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EncMsgPack.EncArr;
  return proto.EncMsgPack.EncArr.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EncMsgPack.EncArr} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EncMsgPack.EncArr}
 */
proto.EncMsgPack.EncArr.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.EncMsgPack.EncVal;
      reader.readMessage(value,proto.EncMsgPack.EncVal.deserializeBinaryFromReader);
      msg.addVals(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EncMsgPack.EncArr.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EncMsgPack.EncArr.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EncMsgPack.EncArr} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.EncArr.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getValsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.EncMsgPack.EncVal.serializeBinaryToWriter
    );
  }
};


/**
 * repeated EncVal vals = 1;
 * @return {!Array<!proto.EncMsgPack.EncVal>}
 */
proto.EncMsgPack.EncArr.prototype.getValsList = function() {
  return /** @type{!Array<!proto.EncMsgPack.EncVal>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.EncMsgPack.EncVal, 1));
};


/** @param {!Array<!proto.EncMsgPack.EncVal>} value */
proto.EncMsgPack.EncArr.prototype.setValsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.EncMsgPack.EncVal=} opt_value
 * @param {number=} opt_index
 * @return {!proto.EncMsgPack.EncVal}
 */
proto.EncMsgPack.EncArr.prototype.addVals = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.EncMsgPack.EncVal, opt_index);
};


proto.EncMsgPack.EncArr.prototype.clearValsList = function() {
  this.setValsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.EncMsgPack.EncMsg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.EncMsgPack.EncMsg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.EncMsgPack.EncMsg.displayName = 'proto.EncMsgPack.EncMsg';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.EncMsgPack.EncMsg.prototype.toObject = function(opt_includeInstance) {
  return proto.EncMsgPack.EncMsg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.EncMsgPack.EncMsg} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.EncMsg.toObject = function(includeInstance, msg) {
  var f, obj = {
    lid: jspb.Message.getFieldWithDefault(msg, 1, 0),
    arr: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.EncMsgPack.EncMsg}
 */
proto.EncMsgPack.EncMsg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.EncMsgPack.EncMsg;
  return proto.EncMsgPack.EncMsg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.EncMsgPack.EncMsg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.EncMsgPack.EncMsg}
 */
proto.EncMsgPack.EncMsg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setLid(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setArr(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.EncMsgPack.EncMsg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.EncMsgPack.EncMsg.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.EncMsgPack.EncMsg} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.EncMsgPack.EncMsg.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLid();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getArr();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional int32 lid = 1;
 * @return {number}
 */
proto.EncMsgPack.EncMsg.prototype.getLid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.EncMsgPack.EncMsg.prototype.setLid = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 arr = 2;
 * @return {number}
 */
proto.EncMsgPack.EncMsg.prototype.getArr = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.EncMsgPack.EncMsg.prototype.setArr = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 start_msgs = 1;
 * @return {number}
 */
proto.EncMsgPack.prototype.getStartMsgs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.EncMsgPack.prototype.setStartMsgs = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 start_arrs = 2;
 * @return {number}
 */
proto.EncMsgPack.prototype.getStartArrs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.EncMsgPack.prototype.setStartArrs = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 start_strs = 3;
 * @return {number}
 */
proto.EncMsgPack.prototype.getStartStrs = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.EncMsgPack.prototype.setStartStrs = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 start_i32s = 4;
 * @return {number}
 */
proto.EncMsgPack.prototype.getStartI32s = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {number} value */
proto.EncMsgPack.prototype.setStartI32s = function(value) {
  jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 start_dbls = 5;
 * @return {number}
 */
proto.EncMsgPack.prototype.getStartDbls = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.EncMsgPack.prototype.setStartDbls = function(value) {
  jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 start_byts = 6;
 * @return {number}
 */
proto.EncMsgPack.prototype.getStartByts = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/** @param {number} value */
proto.EncMsgPack.prototype.setStartByts = function(value) {
  jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * repeated EncMsg msgs = 7;
 * @return {!Array<!proto.EncMsgPack.EncMsg>}
 */
proto.EncMsgPack.prototype.getMsgsList = function() {
  return /** @type{!Array<!proto.EncMsgPack.EncMsg>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.EncMsgPack.EncMsg, 7));
};


/** @param {!Array<!proto.EncMsgPack.EncMsg>} value */
proto.EncMsgPack.prototype.setMsgsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 7, value);
};


/**
 * @param {!proto.EncMsgPack.EncMsg=} opt_value
 * @param {number=} opt_index
 * @return {!proto.EncMsgPack.EncMsg}
 */
proto.EncMsgPack.prototype.addMsgs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 7, opt_value, proto.EncMsgPack.EncMsg, opt_index);
};


proto.EncMsgPack.prototype.clearMsgsList = function() {
  this.setMsgsList([]);
};


/**
 * repeated EncArr arrs = 8;
 * @return {!Array<!proto.EncMsgPack.EncArr>}
 */
proto.EncMsgPack.prototype.getArrsList = function() {
  return /** @type{!Array<!proto.EncMsgPack.EncArr>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.EncMsgPack.EncArr, 8));
};


/** @param {!Array<!proto.EncMsgPack.EncArr>} value */
proto.EncMsgPack.prototype.setArrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 8, value);
};


/**
 * @param {!proto.EncMsgPack.EncArr=} opt_value
 * @param {number=} opt_index
 * @return {!proto.EncMsgPack.EncArr}
 */
proto.EncMsgPack.prototype.addArrs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 8, opt_value, proto.EncMsgPack.EncArr, opt_index);
};


proto.EncMsgPack.prototype.clearArrsList = function() {
  this.setArrsList([]);
};


/**
 * repeated string strs = 9;
 * @return {!Array<string>}
 */
proto.EncMsgPack.prototype.getStrsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 9));
};


/** @param {!Array<string>} value */
proto.EncMsgPack.prototype.setStrsList = function(value) {
  jspb.Message.setField(this, 9, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.EncMsgPack.prototype.addStrs = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 9, value, opt_index);
};


proto.EncMsgPack.prototype.clearStrsList = function() {
  this.setStrsList([]);
};


/**
 * repeated sint64 i32s = 10;
 * @return {!Array<number>}
 */
proto.EncMsgPack.prototype.getI32sList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 10));
};


/** @param {!Array<number>} value */
proto.EncMsgPack.prototype.setI32sList = function(value) {
  jspb.Message.setField(this, 10, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.EncMsgPack.prototype.addI32s = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 10, value, opt_index);
};


proto.EncMsgPack.prototype.clearI32sList = function() {
  this.setI32sList([]);
};


/**
 * repeated double dbls = 11;
 * @return {!Array<number>}
 */
proto.EncMsgPack.prototype.getDblsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedFloatingPointField(this, 11));
};


/** @param {!Array<number>} value */
proto.EncMsgPack.prototype.setDblsList = function(value) {
  jspb.Message.setField(this, 11, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.EncMsgPack.prototype.addDbls = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 11, value, opt_index);
};


proto.EncMsgPack.prototype.clearDblsList = function() {
  this.setDblsList([]);
};


/**
 * repeated sint64 byts = 12;
 * @return {!Array<number>}
 */
proto.EncMsgPack.prototype.getBytsList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 12));
};


/** @param {!Array<number>} value */
proto.EncMsgPack.prototype.setBytsList = function(value) {
  jspb.Message.setField(this, 12, value || []);
};


/**
 * @param {!number} value
 * @param {number=} opt_index
 */
proto.EncMsgPack.prototype.addByts = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 12, value, opt_index);
};


proto.EncMsgPack.prototype.clearBytsList = function() {
  this.setBytsList([]);
};


goog.object.extend(exports, proto);
