const ReservationsRepository = require("../repositories/reservationsRepositories");

class ReservationsService {
    reservationsRepository = new ReservationsRepository();

    findReservations = async (user_id, flight_id, people_num, total_price) => {
        const reservations = await this.reservationsRepository.findReservations(
            user_id,
            flight_id,
            people_num,
            total_price
        );

        return reservations;
    };

    createReservations = async (user_id, flight_id, people_num) => {
        const newReservations = await this.reservationsRepository.createFlights(
            user_id,
            flight_id,
            people_num
        );
        return newReservations;
    };
}

module.exports = ReservationsService;
