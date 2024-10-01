const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD} = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  
  const decode = jwt.verify(token, JWT_ADMIN_PASSWORD, (err, decoded) => {
    if (err) {
      return res.send({ message: "ONLYADMIN" });
    }
    req.userId = decoded.id;
    
    next();
  });
}

module.exports = {
  adminMiddleware,
};
