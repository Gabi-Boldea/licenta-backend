import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
    },
    county: {
        type: String,
    },
    country: {
        type: String,
    },
    postalCode: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);
export default User;