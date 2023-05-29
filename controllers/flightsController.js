const FlightsServeice = require("../services/flightsService"); // service 영역

class FlightsController {
    flightsServeice = new FlightsServeice();

    findAirports = async(req, res, next) => {
        const airports = await this.flightsServeice.findAirports();
        res.status(200).json({ data: airports });
    };

    findFlights = async(req, res, next) => {
        const { sairport_id, eairport_id, start_datetime } = req.body;
        const flights = await this.flightsServeice.findFlights(sairport_id, eairport_id, start_datetime);
        res.status(200).json({ data: flights });
    };

    createFlights = async(req, res, next) => {
        const { sairport_id, eairport_id, start_datetime } = req.body;
        const newFlights = await this.flightsServeice.createFlights(sairport_id, eairport_id, start_datetime);
        res.status(200).json({ data: newFlights });
    }
}

module.exports = FlightsController;