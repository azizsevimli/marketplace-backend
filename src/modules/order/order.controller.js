import orderService from "./order.service.js";

async function createOrder(req, res) {
  try {
    const customerId = req.user.id;
    const { shippingAddress, totalPrice } = req.body;
    const result = await orderService.createOrder({
      customerId,
      shippingAddress,
      totalPrice,
    });

    return res
      .status(201)
      .json({ success: true, message: "Sipariş oluşturuldu.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş oluşturulurken bir hata oluştu",
    });
  }
}

async function getOrder(req, res) {
  try {
    const customerId = req.user.id;
    const id = req.params.id;
    const result = await orderService.getOrder({ id });

    if (result.customer_id !== customerId) {
      return res
        .status(403)
        .json({ success: false, message: "Yetkisiz sipariş isteği." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Sipariş getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş getirilirken bir hata oluştu",
    });
  }
}

async function getOrdersByCustomerId(req, res) {
  try {
    const customerId = req.user.id;
    const result = await orderService.getOrder({ customerId });

    return res
      .status(200)
      .json({ success: true, message: "Siparişler getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş getirilirken bir hata oluştu",
    });
  }
}

async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const status = req.body.success;
    const result = await orderService.updateOrder({ id, status });

    return res
      .status(200)
      .json({ success: true, message: "Sipariş güncellendi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş güncellenirken bir hata oluştu",
    });
  }
}

export default { createOrder, getOrder, getOrdersByCustomerId, updateOrder };
