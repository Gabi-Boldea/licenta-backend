import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    deliveryDetails: {
        email: {type: String, required: true},
        name: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        addressLine1: {type: String, required: true},
        addressLine2: {type: String, required: true},
        city: {type: String, required: true},
        county: {type: String, required: true},
        postalCode: {type: String, required: true},
    },
    cartItems: [
        {
            menuItemId: {type: String, required: true},
            quantity: {type: Number, required: true},
            name: {type: String, required: true},
        },
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ["placed", "paid", "inProgess", "outForDelivery", "delivered"],
    },
    createdAt: {type: Date, default: Date.now},
});

const Order = mongoose.model("Order", orderSchema);

export default Order;