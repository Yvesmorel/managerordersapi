const { createInvoices } = require("../controllers/invoicesController");

const verifyToken = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.post("/orders/:id/invoice", verifyToken, createInvoices);
};
