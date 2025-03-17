var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { admin } = require("../config/firebase");
const verifyToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const idToken = req.cookies.access_token;
    // const idToken=req.body.accessToken
    if (!idToken) {
        return res.status(403).json({ error: "No token provided" });
    }
    try {
        const decodedToken = yield admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error);
        return res.status(403).json({ error: "Unauthorized" });
    }
});
module.exports = verifyToken;
//# sourceMappingURL=authMiddleware.js.map