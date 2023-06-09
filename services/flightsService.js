const FlightsRepository = require("../repositories/flightsRepositories");

class FlightsService {
    flightsRepository = new FlightsRepository();

    findAirports = async() => {
        const airports = await this.flightsRepository.findAirports();
        return airports;
    };

    findFlights = async(sairport_id, eairport_id, start_datetime, people_num, sort_field, sort_by) => {
        let flights = await this.flightsRepository.findFlights(sairport_id, eairport_id, start_datetime, people_num, sort_field, sort_by);

        if (flights.length === 0) {
            await this.flightsRepository.createFlights(sairport_id, eairport_id, start_datetime);
        }

        flights = await this.flightsRepository.findFlights(sairport_id, eairport_id, start_datetime, people_num, sort_field, sort_by);
        return flights;
    };

    createFlights = async(sairport_id, eairport_id, start_datetime) => {
        const newFlights = await this.flightsRepository.createFlights(sairport_id, eairport_id, start_datetime);
        return newFlights;
    };
};

module.exports = FlightsService;