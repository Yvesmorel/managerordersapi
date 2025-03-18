const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY_JWT;

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);
  if (!authorizationHeader) {
    const message = `You did not provide an authentication token. Add one to the request header.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader;
  console.log(token);
  
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {

      console.log(error.message);
      
      const message = `You are not authorized to access this resource.`;
      return res.status(401).json({ message, data: error });
    }

    const password = decodedToken.Password;

    if (process.env.JWT_PASSWORD !== password) {
      const message = `Your token is invalid.`;
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};
