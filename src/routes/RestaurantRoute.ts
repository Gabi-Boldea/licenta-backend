import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get(
    "/:restaurantId", 
    param("restarurantId").isString().trim().notEmpty().withMessage("It must be a valid restaurantId"),
    RestaurantController.getRestaurant
)

router.get(
    "/search/:address",
    param("address").isString().trim().notEmpty().withMessage("It must be a valid City"),
    RestaurantController.searchRestaurant
);

export default router;