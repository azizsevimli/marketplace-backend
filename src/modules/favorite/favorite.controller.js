import favoriteService from "./favorite.service.js";

async function createFavorite(req, res) {
  try {
    const customerId = req.user.id;
    const { productId } = req.body;
    const result = await favoriteService.createFavorite({
      customerId,
      productId,
    });

    return res
      .status(201)
      .json({ success: true, message: "Ürün favorilere eklendi.", result });
  } catch (e) {
    console.log(e);

    if (e.code == 23505) {
      return res.status(404).json({
        success: false,
        message: "Ürün zaten favorilerde bulunuyor.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Ürün favorilere eklenirken bir sorun oluştu.",
    });
  }
}

async function getFavorites(req, res) {
  try {
    const customerId = req.user.id;
    const result = await favoriteService.getFavorites({ customerId });

    return res.status(200).json({
      success: true,
      message: "Müşterinin favorileri getirildi.",
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
      message: "Müşteri favorileri getirilirken bir sorun oluştu.",
    });
  }
}

async function deleteFavorite(req, res) {
  try {
    const customerId = req.user.id;
    const { productId } = req.body;

    await favoriteService.deleteFavorite({ customerId, productId });

    return res
      .status(200)
      .json({ success: true, message: "Ürün favorilerden kaldırıldı" });
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
      message: "Müşteri favorileri getirilirken bir sorun oluştu.",
    });
  }
}

export default { createFavorite, getFavorites, deleteFavorite };
