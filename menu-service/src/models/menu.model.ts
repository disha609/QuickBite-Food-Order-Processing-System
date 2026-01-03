import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, enum: ['veg', 'non-veg', 'dessert'], required: true },
  available: { type: Boolean, default: true },
  ingredients: [{ type: String }],
  prepTime: { type: Number },
  rating: { type: Number, default: 0 },
  tags: [{ type: String }]
}, {
  timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
