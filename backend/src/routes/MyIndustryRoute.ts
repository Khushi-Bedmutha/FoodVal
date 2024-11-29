import express from "express";
import multer from "multer";
import MyIndustryController from "../controllers/MyIndustryController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyIndustryRequest } from "../middleware/validation";

const router = express.Router();

// Set up multer to store files in memory (for Cloudinary or other upload services)
const storage = multer.memoryStorage(); // Using memory storage
const upload = multer({
  storage: storage, // Set storage to memory storage
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyIndustryController.getMyIndustryOrders
);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyIndustryController.updateOrderStatus
);

// Route to get industry details
router.get("/", jwtCheck, jwtParse, MyIndustryController.getMyIndustry);




// Route to create a new industry
router.post(
  "/",
  upload.single("imageFile"), // Middleware to handle file upload
  validateMyIndustryRequest, // Validate request body
  jwtCheck, // JWT check middleware for authentication
  jwtParse, // Parse JWT for user information
  MyIndustryController.createMyIndustry // Controller method to create industry
);

// Route to update an existing industry
router.put(
  "/",
  upload.single("imageFile"), // Middleware to handle file upload
  validateMyIndustryRequest, // Validate request body
  jwtCheck, // JWT check middleware for authentication
  jwtParse, // Parse JWT for user information
  MyIndustryController.updateMyIndustry // Controller method to update industry
);

export default router; // Export the router
