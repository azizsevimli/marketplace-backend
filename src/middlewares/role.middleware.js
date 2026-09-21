function adminMiddleware(req, res, next) {
  console.log(req.user);

  if (!req.user || req.user.role != "ADMIN") {
    return res
      .status(403)
      .json({ success: false, message: "Bu işlem için yetkiniz yok." });
  }

  next();
}

function vendorMiddleware(req, res, next) {
  console.log(req.user);

  if (!req.user || req.user.role != "VENDOR") {
    return res
      .status(403)
      .json({ success: false, message: "Bu işlem için yetkiniz yok." });
  }

  next();
}

export default { adminMiddleware, vendorMiddleware };
