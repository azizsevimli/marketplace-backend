import cartItemService from "./cartItem.service.js";

async function createCartItem(req, res) {
  try {
    const { cartId, productId, quantity, unitPrice } = req.body;

    if (!cartId || !productId || !quantity || !unitPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri girişi yapıldı" });
    }

    const result = await cartItemService.createCartItem({
      cartId,
      productId,
      quantity,
      unitPrice,
    });

    return res
      .status(201)
      .json({ success: true, message: "Sepet ürünü oluşturuldu.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sepet ürünü oluşturulurken bir hata oluştu.",
    });
  }
}

async function getCartItemsByCartId(req, res) {
  try {
    const cartId = req.params.cartId;
    const result = await cartItemService.getCartItemsByCartId({ cartId });

    return res
      .status(200)
      .json({ success: true, message: "Sepet ürünleri getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sepet ürünleri getirilirken bir hata oluştu.",
    });
  }
}

async function updateCartItem(req, res) {
  try {
    const id = req.params.id;
    const { quantity, unitPrice } = req.body;
    const result = await cartItemService.updateCartItem({
      id,
      quantity,
      unitPrice,
    });

    return res
      .status(200)
      .json({ success: true, message: "Sepet ürünü güncellendi." });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sepet ürünü güncellenirken bir hata oluştu.",
    });
  }
}

async function deleteCartItem(req, res) {
  try {
    const id = req.params.id;
    await cartItemService.deleteCartItem({ id });

    return res
      .status(200)
      .json({ success: true, message: "Sepet ürünü silindi." });
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
      message: "Sepet ürünü silinirken bir hata oluştu.",
    });
  }
}

export default {
  createCartItem,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem,
};
