"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userCreation = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2, // Minimum of 3 characters
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2, // Minimum of 3 characters
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/.test(v); // Valid email format
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 10, // Minimum of 10 characters
        validate: {
            validator: function (v) {
                return /^(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{10,}$/.test(v); // Added '.' to allowed special characters
            },
            message: props => `Password must be at least 10 characters long and contain at least one special character!`
        }
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});
exports.default = (0, mongoose_1.model)('User', userCreation);
