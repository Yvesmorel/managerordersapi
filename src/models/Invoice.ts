const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    }, 
    invoiceNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["unpaid", "paid", "overdue"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
