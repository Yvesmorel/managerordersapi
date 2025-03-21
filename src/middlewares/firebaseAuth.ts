const { admin } = require("../config/firebase");

module.exports = async (req, res, next) => {
  const idToken = req.cookies.access_token;

  // const idToken=req.body.accessToken
  if (!idToken) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Unauthorized" });
  }
};
