import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async(
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("phoneNumber").isString().notEmpty().withMessage("Phone number is required"),
  body("addressLine1").isString().notEmpty().withMessage("Address Line 1 is required"),
  body("addressLine2").isString(),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("county").isString().notEmpty().withMessage("County is required"),
  body("country").isString().notEmpty().withMessage("Country is required"),
  body("postalCode").isString(),
  handleValidationErrors,
];


export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone").isString().notEmpty().withMessage("Phone number is required"),
    body("deliveryPrice")
      .isFloat({ min: 0 })
      .withMessage("Delivery price must be a positive number"),
    body("estimatedDeliveryTime")
      .isInt({ min: 0 })
      .withMessage("Estimated delivery time must be a postivie integar"),
    body("cuisines")
      .isArray()
      .withMessage("Cuisines must be an array")
      .not()
      .isEmpty()
      .withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price")
      .isFloat({ min: 0 })
      .withMessage("Menu item price is required and must be a postive number"),
    handleValidationErrors,
  ];