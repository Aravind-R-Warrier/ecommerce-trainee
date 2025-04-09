import cartModel from '../../model/cartModel.js';
import productModel from '../../model/productModel.js';

// Add item to cart
export const addItemCartController = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const { userId } = req.params;

    if (!product || !quantity) {
      return res.status(400).json({ message: 'Invalid product data' });
    }

    const productDoc = await productModel.findById(product);
    if (!productDoc) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ product, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        item => item.product.toString() === product
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove item from cart
export const deleteItemCartController = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in the cart' });
    }

    cart.items.splice(existingItemIndex, 1);
    await cart.save();

    res.status(200).json({ success: true, message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error in removeItemCartController:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Calculate total
export const getTotalCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel
      .findOne({ userId })
      .populate('items.product', 'price name');

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    let total = 0;
    cart.items.forEach(item => {
      if (item.product && item.product.price) {
        total += item.product.price * item.quantity;
      }
    });

    res.status(200).json({
      success: true,
      message: 'Total price calculated',
      total: total
    });
  } catch (error) {
    console.error('Error in getTotalCartController:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Sync cart
export const syncCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid cart items data. Expected an array of items.' });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, items });
    } else {
      cart.items = items;
    }

    await cart.save();

    return res.status(200).json({ message: 'Cart synced successfully', cart });
  } catch (error) {
    console.error('Error in syncCartController:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all carts
export const getAllCartsController = async (req, res) => {
  try {
    const carts = await cartModel.find().populate('items.product', 'name price');
    res.status(200).json({ success: true, message: "All carts fetched", carts });
  } catch (error) {
    console.error("Error in getAllCartsController:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user cart
export const getUserCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId }).populate('items.product', 'name price');

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "User cart fetched", cart });
  } catch (error) {
    console.error("Error in getUserCartController:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
