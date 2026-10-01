import reviewService from "./review.service.js";

async function createReview(req, res) {
  try {
    const customerId = req.user.id;
    const { productId, orderItemId, description, star } = req.body;

    if (!productId || !orderItemId || !description || !star) {
      return res
        .status(400)
        .json({ success: false, message: "Eksik veri girişi yapıldı" });
    }

    const result = await reviewService.createReview({
      customerId,
      productId,
      orderItemId,
      description,
      star,
    });

    return res
      .status(201)
      .json({ success: true, message: "Yorum oluşturuldu.", result });
  } catch (e) {
    console.log(e);

    if (e.code == "FORBIDDEN") {
      return res.status(403).json({
        success: false,
        message: e.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Yorum oluşturulurken bir hata oluştu.",
    });
  }
}

async function getReview(req, res) {
  try {
    const customerId = req.user.id;
    const id = req.params.id;
    const result = await reviewService.getReview({
      id,
      customerId,
    });

    return res
      .status(200)
      .json({ success: true, message: "Yorum getirildi.", result });
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
      message: "Yorum getirilirken bir hata oluştu.",
    });
  }
}

async function getReviewsByProductId(req, res) {
  try {
    const productId = req.params.productId;
    const result = await reviewService.getReviewsByProductId({
      productId,
    });

    return res
      .status(200)
      .json({ success: true, message: "Ürün yorumları getirildi.", result });
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
      message: "Ürün yorumları getirilirken bir hata oluştu.",
    });
  }
}

async function getReviewsByCustomerId(req, res) {
  try {
    const customerId = req.user.id;
    const result = await reviewService.getReviewsByCustomerId({
      customerId,
    });

    return res.status(200).json({
      success: true,
      message: "Kullanıcı yorumları getirildi.",
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
      message: "Kullanıcı yorumları getirilirken bir hata oluştu.",
    });
  }
}

async function updateReview(req, res) {
  try {
    const customerId = req.user.id;
    const id = req.params.id;
    const { description, star } = req.body;
    const result = await reviewService.updateReviews({
      id,
      customerId,
      description,
      star,
    });

    return res
      .status(200)
      .json({ success: true, message: "Ürün yorumu güncellendi.", result });
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
      message: "Ürün yorumu güncellenirken bir hata oluştu.",
    });
  }
}

async function deleteReview(req, res) {
  try {
    const customerId = req.user.id;
    const id = req.params.id;
    await reviewService.deleteReview({ id, customerId });

    return res
      .status(200)
      .json({ success: true, message: "Ürün yorumu silindi." });
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
      message: "Ürün yorumu silinirken bir hata oluştu.",
    });
  }
}

export default {
  createReview,
  getReview,
  getReviewsByProductId,
  getReviewsByCustomerId,
  updateReview,
  deleteReview,
};
