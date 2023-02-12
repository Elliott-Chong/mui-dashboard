import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// Loading the data
import User from "./models/User.js";
import { dataUser } from "./data/index.js";

import ProductStat from "./models/ProductStat.js";
import { dataProductStat } from "./data/index.js";

import Product from "./models/Product.js";
import { dataProduct } from "./data/index.js";

import Transaction from "./models/Transaction.js";
import { dataTransaction } from "./data/index.js";

import OverallStat from "./models/OverallStat.js";
import { dataOverallStat } from "./data/index.js";

// Config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
const PORT = process.env.PORT || 8000;

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // User.insertMany(dataUser);
    // ProductStat.insertMany(dataProductStat);
    // Product.insertMany(dataProduct);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
