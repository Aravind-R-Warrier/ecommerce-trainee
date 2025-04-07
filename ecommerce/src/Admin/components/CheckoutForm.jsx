import React, { useState } from "react";
import { Container, Grid, Card, CardContent, TextField, FormControlLabel, Checkbox, Button, Typography, Alert } from "@mui/material";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    sameAsBilling: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip.match(/^\d{5}$/)) newErrors.zip = "Invalid Zip Code";
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = "Invalid Card Number";
    if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "Invalid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      alert("Checkout Successful!");
    }
  };

  return (
    <Container >
      <Grid container spacing={3} sx={{display:'flex',alignItems:'center'}}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Billing Address</Typography>
              <TextField fullWidth margin="normal" label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} />
              <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
              <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} error={!!errors.city} helperText={errors.city} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} error={!!errors.state} helperText={errors.state} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Zip" name="zip" value={formData.zip} onChange={handleChange} error={!!errors.zip} helperText={errors.zip} />
                </Grid>
              </Grid>
              <FormControlLabel control={<Checkbox checked={formData.sameAsBilling} onChange={() => setFormData({ ...formData, sameAsBilling: !formData.sameAsBilling })} />} label="Shipping address same as billing" />

              <Typography variant="h6" sx={{ mt: 3 }}>Payment</Typography>
              <TextField fullWidth margin="normal" label="Name on Card" name="cardName" value={formData.cardName} onChange={handleChange} />
              <TextField fullWidth margin="normal" label="Credit Card Number" name="cardNumber" value={formData.cardNumber} onChange={handleChange} error={!!errors.cardNumber} helperText={errors.cardNumber} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Exp Month" name="expMonth" value={formData.expMonth} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="Exp Year" name="expYear" value={formData.expYear} onChange={handleChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="CVV" name="cvv" value={formData.cvv} onChange={handleChange} error={!!errors.cvv} helperText={errors.cvv} />
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleCheckout}>Continue to Checkout</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} m={12} md={4}>
          <Card>
            <CardContent sx={{display:'flex',justifyContent:'center',flexDirection:'column',width:'200px'}}>
              <Typography variant="h5">Cart 🛒</Typography>
              <Typography variant="h6">Item 1 - $15</Typography>
              <Typography variant="h6">Item 2 - $5</Typography>
              <Typography variant="h6">Item 3 - $8</Typography>
              <Typography variant="h6">Item 4 - $2</Typography>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>Total: $30</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutForm;
