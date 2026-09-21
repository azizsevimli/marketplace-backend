import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ success: false, message: "Geçersiz veya süresi dolmuş token." });
  }
}

export default authMiddleware;
