import storeService from "./store.service.js";

async function createStore(req, res) {
  try {
    const {
      vendorId,
      name,
      slug,
      description,
      phone,
      email,
      address,
      logo = null,
    } = req.body;

    const result = await storeService.createStore({
      vendorId,
      name,
      slug,
      description,
      phone,
      email,
      address,
      logo,
    });

    return res
      .status(201)
      .json({ success: true, message: "Mağaza oluşturuldu.", result });
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
      .json({ success: false, message: "Mağaza oluşturulurken hata oluştu." });
  }
}

async function getMyStore(req, res) {
  try {
    const id = req.params.id;
    const result = await storeService.getMyStore({ id });
    return res
      .status(200)
      .json({ success: true, message: "Mağaza bulundu.", result });
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

async function updateMyStore(req, res) {
  try {
    const { name, slug, description, logo, phone, email, address, status, id } =
      req.body;
    const result = await storeService.updateMyStore({
      name,
      slug,
      description,
      logo,
      phone,
      email,
      address,
      status,
      id,
    });

    return res
      .status(200)
      .json({ success: true, message: "Mağaza bilgileri güncellendi" });
  } catch (e) {
    console.log(e);

    if (e.code == "NOT_FOUND") {
      res.status(404).json({ success: false, message: e.message });
    }

    return res
      .status(500)
      .json({ success: false, message: "Mağaza bilgileri güncellenemedi!" });
  }
}

export default { createStore, getMyStore, updateMyStore };
