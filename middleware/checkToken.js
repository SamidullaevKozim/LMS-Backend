import jwt from "jsonwebtoken";

let chekToken = (req, res, next) => {
  let header = req.headers.authorization;

  if (!header) return res.send("No token provoided");

  try {
    let token = header.split(" ")[1];

    if(!token){
      return res.status(401).send({message: "No token"})
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) { 
    return res.status(401).send({message: "Token is invalid"});
  }
};

export default chekToken;
