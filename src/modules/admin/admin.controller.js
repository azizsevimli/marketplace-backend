import adminService from "./admin.service.js";
import Validations from "../../common/utils/validations.js";
import userService from "../user/user.service.js";

async function register(req, res) {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

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

    const result = await adminService.register({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Kullanıcı başarılı bir şekilde oluşturuldu.",
      userId: result,
    });
  } catch (e) {
    console.log(e);

    if (e.code == 23505) {
      return res
        .status(409)
        .json({ success: false, message: "Bu email zaten kullanılıyor." });
    }

    return res.status(500).json({
      success: false,
      message: "Kullanıcı oluşturulurken bir hata oluştu.",
    });
  }
}

async function getDashboardStats(req, res) {
  try {
    const stats = await adminService.getDashboardStats();

    return res
      .status(200)
      .json({ success: true, message: "Veriler getirildi.", stats });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilirken bir sorun oluştu.",
    });
  }
}

async function getAdmins(req, res) {
  try {
    const admins = await adminService.getAdmins();

    return res
      .status(200)
      .json({ success: true, message: "Admin verileri getirildi.", admins });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilirken bir sorun oluştu.",
    });
  }
}

async function getCustomers(req, res) {
  try {
    const customers = await adminService.getCustomers();

    return res.status(200).json({
      success: true,
      message: "Müşteri verileri getirildi.",
      customers,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilirken bir sorun oluştu.",
    });
  }
}

async function getVendors(req, res) {
  try {
    const vendors = await adminService.getVendors();

    return res.status(200).json({
      success: true,
      message: "Satıcı verileri getirildi.",
      vendors,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilirken bir sorun oluştu.",
    });
  }
}

async function getVendorById(req, res) {
  try {
    const id = req.params.id;
    const vendor = await adminService.getVendorById({ id });

    return res.status(200).json({
      success: true,
      message: "Satıcı verileri getirildi.",
      vendor,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilirken bir sorun oluştu.",
    });
  }
}

async function updateVendorStatus(req, res) {
  try {
    const id = req.params.id;
    const { status, rejectedMessage } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Durum bilgisi eksik." });
    }

    await adminService.updateVendorStatus({ id, status, rejectedMessage });
    return res
      .status(200)
      .json({ success: true, message: "Satıcı durumu güncellendi." });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler güncellenirken bir sorun oluştu.",
    });
  }
}

async function getCategoriesWithSub(req, res) {
  try {
    const categories = await adminService.getCategoriesWithSub();

    return res
      .status(200)
      .json({ success: true, message: "Kategoriler getirildi.", categories });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Kategoriler getirilirken bir sorun oluştu.",
    });
  }
}

async function getStores(req, res) {
  try {
    const result = await adminService.getStores();
    return res
      .status(200)
      .json({ success: true, message: "Mağazalar getirildi.", result });
  } catch (e) {
    console.log(e);

    if (e.code == "NOT_FOUND") {
      res.status(404).json({ success: false, message: e.message });
    }

    return res.status(500).json({
      success: false,
      message: "Mağaza bilgileri getirilirken bir sorun oluştu.",
    });
  }
}

async function getOrders(req, res) {
  try {
    const result = await adminService.getOrders();
    return res
      .status(200)
      .json({ success: true, message: "Siparişler getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş bilgileri getirilirken bir sorun oluştu.",
    });
  }
}

async function getOrderItemsByOrderId(req, res) {
  try {
    const orderId = req.params.orderId;
    const result = await adminService.getOrderItemsByOrderId({ orderId });
    return res
      .status(200)
      .json({ success: true, message: "Sipariş detayı getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş detayı getirilirken bir sorun oluştu.",
    });
  }
}

async function getProducts(req, res) {
  try {
    const result = await adminService.getProducts();
    return res
      .status(200)
      .json({ success: true, message: "Ürünler getirildi.", result });
  } catch (e) {
    console.log(e);

    if (e.code == "NOT_FOUND") {
      res.status(404).json({ success: false, message: e.message });
    }

    return res.status(500).json({
      success: false,
      message: "Ürünler getirilirken bir sorun oluştu.",
    });
  }
}

async function getProductsByStatus(req, res) {
  try {
    const status = req.query.status;
    const result = await adminService.getProductsByStatus({ status });
    return res
      .status(200)
      .json({ success: true, message: "Ürünler getirildi.", result });
  } catch (e) {
    console.log(e);

    // if (e.code == "NOT_FOUND") {
    //   res.status(404).json({ success: false, message: e.message });
    // }

    return res.status(500).json({
      success: false,
      message: "Ürünler getirilirken bir sorun oluştu.",
    });
  }
}

async function getProductDetail(req, res) {
  try {
    const id = req.params.id;
    const result = await adminService.getProductDetail({ id });
    return res
      .status(200)
      .json({ success: true, message: "Ürün bilgileri getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ürünler bilgileri getirilirken bir sorun oluştu.",
    });
  }
}

async function updateProductStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await adminService.updateProductStatus({ id, status });
    return res
      .status(200)
      .json({ success: true, message: "Ürün durumu güncellendi", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ürün durumu güncellenirken bir sorun oluştu.",
    });
  }
}

export default {
  register,
  getDashboardStats,
  getAdmins,
  getCustomers,
  getVendors,
  getVendorById,
  updateVendorStatus,
  getCategoriesWithSub,
  getStores,
  getOrders,
  getOrderItemsByOrderId,
  getProducts,
  getProductsByStatus,
  getProductDetail,
  updateProductStatus,
};
