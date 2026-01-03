import { Request, Response } from 'express';
import Order from '../models/order.model';
import { producer } from '../../../common/kafka/producer';
import { createConsumer } from '../../../common/kafka/consumer';

// Place Order
export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = new Order(req.body);
    order.finalAmount = (order.totalAmount ?? 0) - (order.discountApplied ?? 0);

    await order.save();

    // Emit Kafka event order-placed
    await producer.send({
      topic: 'order-placed',
      messages: [
        { value: JSON.stringify({
            type: 'ORDER_PLACED',
            userId: order.userId,
            orderId: order._id,
            orderDetails: order,
          }) },
      ],
    });
    
    res.status(201).json(order);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

// Cancel Order (if within 10 mins)
export const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    const createdAt = new Date(order.createdAt);
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - createdAt.getTime()) / 60000);

    if (diffMins > 10) {
      res.status(400).json({ message: 'Cancellation period expired' });
      return;
    }

    order.orderStatus = 'cancelled';
    await order.save();
    res.json({ message: 'Order cancelled', order });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get Order by ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Get Orders by User
export const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Reorder
export const reorder = async (req: Request, res: Response): Promise<void> => {
  try {
    const oldOrder = await Order.findById(req.params.id);
    if (!oldOrder) {
      res.status(404).json({ message: 'Original order not found' });
      return;
    }

    const newOrder = new Order({
      ...oldOrder.toObject(),
      _id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      orderStatus: 'placed',
      paymentStatus: 'pending',
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Submit Feedback
export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating, comment } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { feedback: { rating, comment } },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

// --- Kafka Notification Listener ---
export const startNotificationListener = async () => {
  const consumer = createConsumer('notifications-group');
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-placed' });  // Make sure topic matches producer!

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) {
        console.warn('Kafka message value is null, skipping...');
        return;
      }

      const event = JSON.parse(message.value.toString());

      if (event.type === 'ORDER_PLACED') {
        console.log(`Notification: Send email to user ${event.userId} for Order ${event.orderId}`);
        // TODO: integrate email/sms sender here, e.g. nodemailer, twilio, etc.
      }
    },
  });
};
