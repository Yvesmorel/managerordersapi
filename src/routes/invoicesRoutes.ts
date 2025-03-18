const { createInvoices } = require("../controllers/invoicesController");

const verifyToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {
  app.post("/orders/:id/invoice", verifyToken, createInvoices);
};
