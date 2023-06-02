const epxress = require("express");
const router = epxress.Router();

const FlightsController = require("../controllers/flightsControllers");
const flightsController = new FlightsController();

router.get('/airports', flightsController.findAirports);
router.get('/flights', flightsController.findFlights);
router.get('/newflights', flightsController.createFlights);

module.exports = router;