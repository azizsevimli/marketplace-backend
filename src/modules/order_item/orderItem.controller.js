import orderItemService from "./orderItem.service.js";

async function createOrderItem(req, res) {
  try {
    const { orderId, storeId, productId, quantity, unitPrice } = req.body;

    if (!orderId || !storeId || !productId || !quantity || !unitPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri gönderdiniz." });
    }

    const result = await orderItemService.createOrderItem({
      orderId,
      storeId,
      productId,
      quantity,
      unitPrice,
    });

    return res
      .status(201)
      .json({ success: true, message: "Sipariş oluşturuldu.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş oluşturulurken bir hata oluştu.",
    });
  }
}

async function getOrderItemsByOrderId(req, res) {
  try {
    const orderId = req.params.orderId;
    const result = await orderItemService.getOrderItemsByOrderId({ orderId });

    return res
      .status(200)
      .json({ success: true, message: "Sipariş bilgileri getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş bilgileri getirilirken bir hata oluştu.",
    });
  }
}

async function updateOrderItem(req, res) {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const result = await orderItemService.updateOrderItem({
      orderId: id,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Sipariş bilgileri güncellendi.",
      result,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Sipariş bilgileri güncellenirken bir hata oluştu.",
    });
  }
}

export default { createOrderItem, getOrderItemsByOrderId, updateOrderItem };
