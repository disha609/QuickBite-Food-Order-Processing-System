import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    menuItemId: String,
    quantity: Number,
    price: Number
  }],
  address: {
    type: String,
    required: true
  },
  instructions: String,
  totalAmount: Number,
  discountApplied: { type: Number, default: 0 },
  finalAmount: Number,
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['placed', 'preparing', 'delivered', 'cancelled'], default: 'placed' },
  deliveryTime: Date,
  feedback: {
    rating: Number,
    comment: String
  },
  promoCode: String
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
