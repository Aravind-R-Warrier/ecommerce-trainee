import express from "express";
import cors from "cors";
import productRoutes from "./routes/adminRoutes/productRoutes.js";
import couponRoutes from "./routes/adminRoutes/couponRoutes.js"
import vendorRoutes from "./routes/vendorRoutes/vendorRoutes.js";
import connectDb from "./db/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDb()



// Middleware
app.use(express.json());
// cors
app.use(cors({
    origin: "http://localhost:5173", // 👈 your frontend origin
    credentials: true                // 👈 allow credentials (cookies, headers)
  }));

app.use("/uploads", express.static("uploads")); // Serve images

// Routes admin
app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes);

// routes vendor
app.use("/api/vendors", vendorRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
