const { createInvoices } = require("../controllers/invoicesController");

const verifyFirebaseToken = require("../middlewares/firebaseAuth");

module.exports = (app) => {
  app.post("/orders/:id/invoice", verifyFirebaseToken, createInvoices);
};
