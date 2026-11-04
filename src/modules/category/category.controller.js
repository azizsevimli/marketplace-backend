import categoryService from "./catgeory.service.js";

async function createCategory(req, res) {
  try {
    const { title, slug } = req.body;

    if (!title || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri gönderildi." });
    }

    const result = await categoryService.createCategory({ title, slug });
    return res
      .status(201)
      .json({ success: true, message: "Kategori oluşturuldu.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Kategori oluşturulurken bir hata oluştu",
    });
  }
}

async function getCategories(req, res) {
  try {
    const result = await categoryService.getCategories();
    return res
      .status(200)
      .json({ success: true, message: "Kategoriler getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Kategoriler getirilirken bir hata oluştu",
    });
  }
}

async function getCategoryById(req, res) {
  try {
    const id = req.params.id;
    const result = await categoryService.getCategoryById({ id });
    return res.status(200).json({
      success: true,
      message: "ID'ye sahip kategori getirildi.",
      result,
    });
  } catch (e) {
    console.log(e);

    if (e.code == "NOT_FOUND") {
      res.status(404).json({
        success: false,
        message: e.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "ID'ye sahip kategori getirilirken bir hata oluştu",
    });
  }
}

async function updateCategory(req, res) {
  try {
    const id = req.params.id;
    const { title, slug } = req.body;

    if (!id || !title || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri gönderildi." });
    }

    const result = categoryService.updateCategory({ id, title, slug });
    return res
      .status(200)
      .json({ success: true, message: "ID'ye sahip kategori güncellendi." });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "ID'ye sahip kategori güncellenirken bir hata oluştu",
    });
  }
}

async function deleteCategory(req, res) {
  try {
    const id = req.params.id;
    await categoryService.deleteCategory({ id });

    return res
      .status(200)
      .json({ success: true, message: "Alt kategori silindi." });
  } catch (e) {
    console.log(e);

    if (e.code == "NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: e.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Kategori silinirken bir hata oluştu.",
    });
  }
}

export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
