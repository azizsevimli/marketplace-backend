import authService from "./auth.service.js";
import Validations from "../../common/utils/validations.js";

async function register(req, res) {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri girişi yapıldı" });
    }

    if (!Validations.validateEmail(email)) {
      return res
        .status(422)
        .json({ success: false, message: "Email formatı hatalı." });
    }

    if (!Validations.validatePassword(password)) {
      return res
        .status(422)
        .json({ success: false, message: "Şifre kuralları sağlanmıyor." });
    }

    const result = await authService.register({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Kullanıcı başarılı bir şekilde oluşturuldu.",
      result: result,
    });
  } catch (e) {
    console.log(e);

    if (e.code == 23502) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri girişi yapıldı." });
    }

    if (e.code == 23505) {
      return res
        .status(409)
        .json({ success: false, message: "Bu email zaten kullanılıyor." });
    }
    return res
      .status(500)
      .json({ success: false, message: "Kullanıcı oluşturulamadı." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email veya şifre bulunamadı." });
    }

    const result = await authService.login({ email, password });
    return res.status(200).json({
      success: true,
      message: "Giriş başarılı.",
      token: result.token,
      user: result.user,
    });
  } catch (e) {
    console.log(e);

    if (e.code == "INVALID_CREDENTIALS") {
      return res
        .status(401)
        .json({ success: false, message: "Email veya şifre hatalı." });
    }

    return res
      .status(500)
      .json({ success: false, message: "Giriş yapılamadı." });
  }
}

async function getMe(req, res) {
  try {
    const id = req.user.id;
    const result = await authService.getMe({ id });
    return res.status(200).json({
      success: true,
      message: "Veriler başarı ile getirildi.",
      result: result,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilirken hata oluştu.",
    });
  }
}

export default { register, login, getMe };
