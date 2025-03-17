const PORT = process.env.PORT || 8080;
module.exports = (app) => {
    require("./routes/authRoutes")(app);
    require("./routes/userRoutes")(app);
    app.listen(PORT, () => {
        return console.log(`Express is listening at http://localhost:${PORT}`);
    });
};
//# sourceMappingURL=server.js.map