const firebaseAuthController = require("../controllers/firebase-auth-controller");
module.exports = (app) => {
    app.post("/api/register", firebaseAuthController.registerUser);
    app.post("/api/login", firebaseAuthController.loginUser);
    app.post("/api/logout", firebaseAuthController.logoutUser);
    app.post("/api/reset-password", firebaseAuthController.resetPassword);
};
//# sourceMappingURL=authRoutes.js.map