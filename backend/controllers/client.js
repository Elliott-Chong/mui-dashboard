import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.findOne({ productId: product._id });
        return { ...product._doc, stat: stat };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // sort will look something like this "{field: 'userId', order: 'asc'}"
    const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;
    const generateSortForMongo = (sort) => {
      if (sort === "") return {};
      if (!sort) return {};
      const obj = JSON.parse(sort);
      return { [obj.field]: obj.order === "asc" ? 1 : -1 };
    };

    const sortFormatted = generateSortForMongo(sort);
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sortFormatted)
      .limit(pageSize)
      .skip(page * pageSize);
    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ],
    });
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find({});
    const mappedLocations = users.reduce((acc, user) => {
      user.country = getCountryIso3(user.country);
      if (!acc[user.country]) {
        acc[user.country] = 1;
      } else {
        acc[user.country] += 1;
      }
      return acc;
    });
    const locations = Object.keys(mappedLocations).map((country) => {
      return { id: country, value: mappedLocations[country] };
    });
    return res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
