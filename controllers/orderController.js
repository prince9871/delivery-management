import Order from '../models/Order.js';
import generateUniqueId from '../utils/generateUniqueId.js'; // Helper function

// Create an order
export const createOrder = async (req, res) => {
  const { driverId, customerName, deliveryAddress, totalAmount } = req.body;

  try {
    const order = new Order({
      orderId: generateUniqueId(6),
      driverId,
      customerName,
      deliveryAddress,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: 'Orders fetched successfully', data: orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { orderStatus,driverId } = req.body;

  try {
    if (!id) return res.status(400).json({ message: 'Order ID is required' });
    if (!orderStatus) return res.status(400).json({ message: 'Order status is required' });
    const order = await Order.findByIdAndUpdate(id, { orderStatus,driverId }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order updated successfully', data: order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(204).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};
