const FlightsRepository = require("../repositories/flightsRepositories");
const { Airports } = require("../models");

class FlightsService {
    flightsRepository = new FlightsRepository();

    findAirports = async() => {
        const airports = await this.flightsRepository.findAirports();
        return airports;
    };

    findFlights = async(sairport_id, eairport_id, start_datetime) => {
        const flights = await this.flightsRepository.findFlights(sairport_id, eairport_id, start_datetime);
        return flights;
    };

    createFlights = async(sairport_id, eairport_id, start_datetime) => {
        const newFlights = await this.flightsRepository.createFlights(sairport_id, eairport_id, start_datetime);
        return newFlights;
    };
};

module.exports = FlightsService;