const { Reservations } = require("../models");

class ReservationsRepository {
    findReservations = async(user_id, flight_id, people_num) => {
        try {
            const reservations = await Reservations.findAll({
                attributes: [
                    "user_id",
                    "flight_id",
                    "people_num",
                    "total_price",
                ],
            });
            if (reservations.length === 0) {
                const message = "예약 정보가 없습니다."
                return message;
            }
            return reservations;

        } catch (error) {
            const errorMessage = "예약 정보 조회에 실패했습니다.";
            return errorMessage;
        }
    };

    createReservations = async(user_id, flight_id, people_num) => {
        try {
            // 예약할 항공권 할당
            const targetFlight = await Flights.findOne({
                where: { flight_id },
            });

            const total_price = targetFlight.price * people_num;
            const reservations = await Reservations.create({
                user_id,
                flight_id,
                people_num,
                total_price,
            });
            return reservations;

        } catch (error) {
            const errorMessage = "reservation 오류";
            return errorMessage;
        }
    };
}

module.exports = ReservationsRepository;