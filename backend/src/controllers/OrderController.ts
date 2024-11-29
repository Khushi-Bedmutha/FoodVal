import Stripe from "stripe";
import { Request, Response } from "express";

import Order from "../models/order";
import Industry from "../models/Industry";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("industry")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

type CheckoutSessionRequest = {
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  industryId: string;
};

const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";

    await order.save();
  }

  res.status(200).send();
};

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const industry = await Industry.findById(checkoutSessionRequest.industryId);

    if (!industry) {
      throw new Error("Industry not found");
    }

    const newOrder = new Order({
      industry: industry,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      createdAt: new Date(),
    });

    const session = await createSession(
      newOrder._id.toString(),
      industry.deliveryPrice,
      industry._id.toString()
    );

    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }

    await newOrder.save();
    res.json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

const createSession = async (
  orderId: string,
  deliveryPrice: number,
  industryId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: deliveryPrice*100,
          product_data: {
            name: `Order from industry ${industryId}`,
          },
        },
        quantity: 1,
      },
    ],
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery with charges",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice*100,
            currency: "inr",
          }
          
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      industryId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${industryId}?cancelled=true`,
  });

  return sessionData;
};

export default {
  getMyOrders,
  createCheckoutSession,
  stripeWebhookHandler,
};
