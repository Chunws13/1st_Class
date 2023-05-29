const epxress = require("express");
const router = epxress.Router();

const FlightsController = require("../controllers/flightsController");
const flightsController = new FlightsController();

router.get('/flights', flightsController.findFlights);
router.get('/airports', flightsController.findAirports);
router.get('/newflights', flightsController.createFlights);

module.exports = router;