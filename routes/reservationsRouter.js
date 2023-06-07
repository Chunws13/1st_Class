const epxress = require("express");
const router = epxress.Router();

const { verifyToken } = require("../middlewares/auth");
const ReservationsController = require("../controllers/reservationsControllers");
const reservationsController = new ReservationsController();

router.get("/reservation", verifyToken, reservationsController.findReservations);
router.post("/reservation", verifyToken, reservationsController.createReservations);

module.exports = router;