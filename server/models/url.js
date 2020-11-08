const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  miniUrl: { type: String, required: true, minlength: 7 },
  fullUrl: { type: String, required: true, minlength: 10 },
  slug: { type: String, required: true, length: 7 },
});

urlSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Url', urlSchema);
