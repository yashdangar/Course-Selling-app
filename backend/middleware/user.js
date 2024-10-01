const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require('../config')

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,JWT_USER_PASSWORD, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.send({ message: "ONLYUSER" });
        }
        req.userId = decoded.id;
        
        next();
      });
}

module.exports = {
    userMiddleware
}