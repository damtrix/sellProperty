const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    unique: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true],
  },
  type: {
    type: String,
    enum: ['bungalow', 'duplex', 'semi detach duplex', 'mansion', 'land'],
    required: [
      true,
      'You have to provide the type of property(bungalow, duplex, semi duplexx, mansion, land)',
    ],
  },
  city: {
    type: String,
    required: [true],
  },
  area: {
    type: String,
    required: [true],
  },
  state: { type: String, required: [true] },
  country: { type: String, required: [true] },
  price: { type: Number, required: [true] },
  size: { type: String, required: [true] },
  noBedrooms: { type: Number },
  noBathrooms: { type: Number },
  imageCover: {
    type: String,
    required: [true, 'A product must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    false: false,
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Pordouct must belong to a seller'],
  },
});

//DOCUMENTS MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'seller',
    select: 'fullName',
  });

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
