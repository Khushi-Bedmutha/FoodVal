import mongoose from "mongoose"; 

const industrySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    industryName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    estimatedDeliveryTime: { type: Number, required: true },
    imageUrl: {type: String, required: true},
    lastUpdated: { type: Date, required: true },
  });

const Industry = mongoose.model("Industry", industrySchema);
export default Industry;