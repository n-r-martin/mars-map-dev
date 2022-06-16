const { Schema, model } = require('mongoose');

const dataSchema = new Schema({
    string: {
        type: String,
        required: true,

    },
    number: {
        type: Number,
        required: true,
        default: 0
    },
    boolean: {
        type: Boolean,
    },
    array: [
        {
          string: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 60,
            trim: true,
          },
          number: {
              type: Number,
              default: 0,
              minlength: 0,   
          }
        },
    ],
  });

  const Data = model('Data', dataSchema);

module.exports = Data;