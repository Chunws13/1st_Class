const epxress = require("express");
const router = epxress.Router();

const auth = require("../middlewares/auth");
const ReservationsController = require("../controllers/reservationsControllers");
const reservationsController = new ReservationsController();

router.get("/reservation", auth, reservationsController.findReservations);
router.post("/reservation", auth, reservationsController.createReservations);

module.exports = router;
