import adminService from "./admin.service.js";

async function getDashboardStats(req, res) {
  try {
    const stats = await adminService.getDashboardStats();

    return res
      .status(200)
      .json({ success: true, message: "Veriler getirildi.", stats });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      success: false,
      message: "Veriler getirilitken bir sorun oluştu.",
    });
  }
}

export default { getDashboardStats };
