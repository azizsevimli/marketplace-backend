import cartService from "./cart.service.js";

async function createCart(req, res) {
  try {
    const customerId = req.user.id;
    const result = await cartService.createCart({ customerId });

    return res
      .status(201)
      .json({ success: true, message: "Sepet oluşturuldu.", result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Sepet oluşturulurken bir hata oluştu.",
    });
  }
}

async function getCart(req, res) {
  try {
    const customerId = req.user.id;
    const result = await cartService.getCart({ customerId });

    return res
      .status(200)
      .json({ success: true, message: "Sepet getirildi.", result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Sepet getirilirken bir hata oluştu.",
    });
  }
}

async function updateCart(req, res) {
  try {
    const customerId = req.user.id;
    const { totalPrice } = req.body;
    const result = await cartService.updateCart({ customerId, totalPrice });

    return res
      .status(200)
      .json({ success: true, message: "Sepet güncellendi.", result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Sepet güncellenirken bir hata oluştu.",
    });
  }
}

export default { createCart, getCart, updateCart };
