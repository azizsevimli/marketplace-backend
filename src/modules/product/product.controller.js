import productService from "./product.service.js";

async function createProduct(req, res) {
  try {
    const {
      storeId,
      categoryId,
      subcategoryId,
      title,
      description,
      price,
      stockQuantity,
      sku,
      images,
    } = req.body;

    if (!storeId || !title || !description || !price || !stockQuantity) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri gönderildi." });
    }

    if (images.length == 0) {
      return res.status(400).json({
        success: false,
        message: "Yüklenecek resim bulunamadı. Ürün oluşturulamadı.",
      });
    }

    const result = await productService.createProduct({
      storeId,
      categoryId,
      subcategoryId,
      title,
      description,
      price,
      stockQuantity,
      sku,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Ürün resimleri ile beraber oluşturuldu.",
      result,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ürün oluşturulurken bir hata oluştu.",
    });
  }
}

async function getProductsById(req, res) {
  try {
    const id = req.params.id;
    const result = await productService.getProductById({ id });
    return res
      .status(200)
      .json({ success: true, message: "Ürün bilgileri getirildi.", result });
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
      message: "Ürün bilgileri getirilirken bir hata oluştu.",
    });
  }
}

async function getProductsByStoreId(req, res) {
  try {
    const storeId = req.query.storeId;
    console.log(storeId);
    const result = await productService.getProductsByStoreId({ storeId });

    return res.status(200).json({
      success: true,
      message: "Mağaza ürün bilgileri getirildi.",
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
      message: "Mağaza ürün bilgileri getirilirken bir hata oluştu.",
    });
  }
}

async function getProductsByFilter(req, res) {
  try {
    const { categoryId, subcategoryId, minPrice, maxPrice } = req.query;
    console.log(
      `category: ${categoryId} ||| subcategory: ${subcategoryId} ||| minPrice: ${minPrice} ||| maxPrice: ${maxPrice}`,
    );

    const result = await productService.getProductsByFilter({
      categoryId,
      subcategoryId,
      minPrice,
      maxPrice,
    });

    return res.status(200).json({
      success: true,
      message: "Mağaza ürün bilgileri getirildi.",
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
      message: "Filitre ile ürün bilgileri getirilirken bir hata oluştu.",
    });
  }
}

async function updateProductDetail(req, res) {
  try {
    const id = req.params.id;
    const { title, description, sku, status } = req.body;

    const result = await productService.updateProductDetail({
      id,
      title,
      description,
      sku,
      status,
    });
    return res
      .status(200)
      .json({ success: true, message: "Ürün bilgileri güncellendi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ürün bilgileri güncellenirken bir hata oluştu.",
    });
  }
}

async function updateProductStock(req, res) {
  try {
    const id = req.params.id;
    const { stockQuantity } = req.body;

    const result = await productService.updateProductStock({
      id,
      stockQuantity,
    });

    return res.status(200).json({
      success: true,
      message: "Ürün stok bilgileri güncellendi.",
      result,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ürün stok bilgileri güncellenirken bir hata oluştu.",
    });
  }
}

async function updateProductPrice(req, res) {
  try {
    const id = req.params.id;
    const { price, discountPrice } = req.body;

    const result = await productService.updateProductPrice({
      id,
      price,
      discountPrice,
    });

    return res.status(200).json({
      success: true,
      message: "Ürün fiyat bilgileri güncellendi.",
      result,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ürün fiyat bilgileri güncellenirken bir hata oluştu.",
    });
  }
}

export default {
  createProduct,
  getProductsById,
  getProductsByStoreId,
  getProductsByFilter,
  updateProductDetail,
  updateProductStock,
  updateProductPrice,
};
