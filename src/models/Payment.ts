const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amountPaid: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: true,
    },

    paymentDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", PaymentSchema);
