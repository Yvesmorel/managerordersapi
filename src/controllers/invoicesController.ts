const Invoices = require("../models/Invoice");

const createInvoices = async (req, res) => {
  try {
    const invoiceData = {
      order: req.params.id,
      ...req.body,
    };

    await Invoices.create(invoiceData);
    res.status(200).json({ invoice: invoiceData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createInvoices,
};
