import subcategoryService from "./subcategory.service.js";

async function createSubcategory(req, res) {
  try {
    const { parentId, title, slug } = req.body;

    if (!parentId || !title || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri gönderildi." });
    }

    const result = await subcategoryService.createSubcategory({
      parentId,
      title,
      slug,
    });

    return res
      .status(201)
      .json({ success: true, message: "Alt kategori oluşturuldu", result });
  } catch (e) {
    console.log(e);

    if (e.code == 23505) {
      return res.status(409).json({
        success: false,
        message:
          "Bu kategori içerisinde aynı ada sahip başka bir alt kategori bulunuyor.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Alt kategori oluşturulurken bir hata oluştu",
    });
  }
}

async function getSubcategoriesByParentId(req, res) {
  try {
    const parentId = req.query.parentId;
    const result = await subcategoryService.getSubcategoriesByParentId({
      parentId,
    });
    return res.status(200).json({
      success: true,
      message: "ID'ye ait alt kategoriler getirildi.",
      result,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "ID'ye ait alt kategoriler getirilirken bir hata oluştu",
    });
  }
}

async function getSubcategoryById(req, res) {
  try {
    const id = req.params.id;
    const result = await subcategoryService.getSubcategoryById({ id });
    return res.status(200).json({
      success: true,
      message: "ID'ye sahip alt kategori getirildi.",
      result,
    });
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
      message: "ID'ye sahip alt kategori getirilirken bir hata oluştu",
    });
  }
}

async function updateSubcategory(req, res) {
  try {
    const id = req.params.id;
    const { parentId, title, slug } = req.body;

    if (!parentId || !title || !slug) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri gönderildi." });
    }

    const result = await subcategoryService.updateSubcategory({
      id,
      parentId,
      title,
      slug,
    });

    return res.status(200).json({
      success: true,
      message: "ID'ye sahip alt kategori güncellendi.",
    });
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
      message: "ID'ye sahip alt kategori güncellenirken bir hata oluştu",
    });
  }
}

export default {
  createSubcategory,
  getSubcategoriesByParentId,
  getSubcategoryById,
  updateSubcategory,
};
