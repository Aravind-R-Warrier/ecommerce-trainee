import React from 'react';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartBadge = ({ cartCount }) => {
  return (
    <IconButton color="primary">
      <Badge badgeContent={cartCount} color="secondary" showZero>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartBadge;
