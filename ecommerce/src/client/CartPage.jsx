import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data.cart.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}`);
      fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Error removing product", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>My Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cart.map(({ product, quantity }) => (
          <Card key={product._id} sx={{ mb: 2, display: 'flex' }}>
            <CardMedia
              component="img"
              image={product.images?.[0]}
              alt={product.name}
              sx={{ width: 150, objectFit: 'contain' }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ₹{product.price}</Typography>
              <Typography>Quantity: {quantity}</Typography>
              <IconButton onClick={() => handleRemove(product._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default CartPage;
