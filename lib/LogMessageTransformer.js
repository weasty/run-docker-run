'use strict';

const {Transform} = require('stream');

class LogMessageTransformer extends Transform {
  constructor(id,level) {
    super({
      readableObjectMode: true,
      writableObjectMode: true
    });
    this.id = id;
    this.level = level;
  }

  _transform(chunk, encoding, callback) {
    chunk.toString().split('\n').forEach(message => {
      if (!message) return;
      this.push({
        id: this.id,
        level: this.level,
        message: message
      });
    });
    callback();
  }
}

module.exports = LogMessageTransformer;
