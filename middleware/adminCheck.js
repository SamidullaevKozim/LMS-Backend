function adminCheck(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(400).send({ messsage: "you're not admin" });
  }
  next();
}

export default adminCheck;
