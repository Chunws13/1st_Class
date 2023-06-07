const ReservationsServeice = require("../services/reservationsService"); // service 영역
class ReservationsController {
    reservationsServeice = new ReservationsServeice();

    findReservations = async (req, res, next) => {
        const { flight_id, people_num, total_price } = req.body;
        const { user_id } = req.params.user_id;

        const reservations = await this.reservationsServeice.findreservations(
            user_id,
            flight_id,
            people_num,
            total_price
        );
        res.status(200).json({ data: reservations });
    };

    createReservations = async (req, res, next) => {
        const { flight_id, people_num } = req.body;
        const { user_id } = res.locals.user;

        const newReservations =
            await this.reservationsServeice.createReservations(
                user_id,
                flight_id,
                people_num
            );
        res.status(200).json({ data: newReservations });
    };
}

module.exports = ReservationsController;
