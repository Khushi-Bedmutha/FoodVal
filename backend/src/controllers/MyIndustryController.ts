import { Request, Response } from "express";

import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Industry from "../models/Industry";
import Order from "../models/order";

// Get the user's industry
const getMyIndustry = async (req: Request, res: Response) => {
  try {
    const industry = await Industry.findOne({ user: req.userId });
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }
    res.json(industry);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching industry" });
  }
};

// Create a new industry for the user
const createMyIndustry = async (req: Request, res: Response) => {
  try {
    const existingIndustry = await Industry.findOne({ user: req.userId });

    if (existingIndustry) {
      return res.status(409).json({ message: "User industry already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const industry = new Industry(req.body);
    industry.imageUrl = imageUrl;
    industry.user = new mongoose.Types.ObjectId(req.userId);
    industry.lastUpdated = new Date();
    await industry.save();

    res.status(201).send(industry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update the user's industry
const updateMyIndustry = async (req: Request, res: Response) => {
  try {
    const industry = await Industry.findOne({
      user: req.userId,
    });

    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }

    industry.industryName = req.body.industryName;
    industry.city = req.body.city;
    industry.country = req.body.country;
    industry.deliveryPrice = req.body.deliveryPrice;
    industry.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    industry.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      industry.imageUrl = imageUrl;
    }

    await industry.save();
    res.status(200).send(industry);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyIndustryOrders = async (req: Request, res: Response) => {
  try {
    const industry= await Industry.findOne({ user: req.userId });
    if (!industry) {
      return res.status(404).json({ message: "industry not found" });
    }

    const orders = await Order.find({ industry: industry._id })
      .populate("industry")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};


// Upload an image to Cloudinary
const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const industry = await Industry.findById(order.industry);

    if (industry?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to update order status" });
  }
};


export default {
  updateOrderStatus,
  getMyIndustryOrders,
  getMyIndustry,
  createMyIndustry,
  updateMyIndustry,

};
