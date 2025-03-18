const PORT = process.env.PORT || 8080;

module.exports = (app) => {
  require("./routes/authRoutes")(app);
  require("./routes/userRoutes")(app);
  require("./routes/orderRoutes")(app);
  require("./routes/invoicesRoutes")(app);
  require("./routes/payementRoutes")(app);

  app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
  });
};
