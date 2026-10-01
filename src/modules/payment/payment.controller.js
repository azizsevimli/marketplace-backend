import paymentService from "./payment.service.js";

async function createPayment(req, res) {
  try {
    const { orderId, price } = req.body;
    const result = await paymentService.createPayment({ orderId, price });

    return res
      .status(201)
      .json({ success: true, message: "Ödeme bilgileri oluşturuldu.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ödeme bilgileri oluşturulurken bir hata oluştu",
    });
  }
}

async function getPayment(req, res) {
  try {
    const id = req.params.id;
    const result = await paymentService.getPayment({ id });

    return res
      .status(200)
      .json({ success: true, message: "Ödeme bilgileri getirildi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ödeme bilgileri getirilirken bir hata oluştu",
    });
  }
}

async function updatePayment(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await paymentService.updatePayment({ id, status });

    return res
      .status(200)
      .json({ success: true, message: "Ödeme bilgileri güncellendi.", result });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Ödeme bilgileri güncellenirken bir hata oluştu",
    });
  }
}

export default { createPayment, getPayment, updatePayment };
