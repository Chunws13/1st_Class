const { Flights, Airports } = require("../models");
const makeRandom = require("../utils/mkRandomNum");
const govApi = require("../utils/govApi");


class FlightsRepository {

    findAirports = async() => {
        try {
            const airports = await Airports.findAll();
            return airports

        } catch (error) {
            errorMessage = "공항 정보 조회에 실패했습니다.";
            return errorMessage;
        }
    };

    // db에서 해당 조건에 맞는 데이터 있는지 확인
    findFlights = async(sairport_id, eairport_id, start_datetime) => {
        try {
            const flights = await Flights.findAll({
                where: { sairport_id, eairport_id, start_datetime }
            });
            return flights;

        } catch (error) {
            errorMessage = "DB 정보 조회 실패";
            return errorMessage;
        }
    };

    // // 없으면 API로 호출 후 저장, 좌석 수 1 ~ 50석 랜덤 배치
    createFlights = async(sairport_id, eairport_id, start_datetime) => {
        try {
            // 공공 데이터 포털에서 가져오기 - 정상적으로 반환될 때 까지 반복
            let res = await govApi(sairport_id, eairport_id, start_datetime);
            const data = res.data.response.body.items.item;

            for await (let d of data) {
                // 남은 자리, 비용 난수 생성
                const seatLeft = makeRandom(1, 50);
                const price = makeRandom(100, 500) * 1000;

                const { arrAirportNm, depAirportNm, arrPlandTime, depPlandTime } = d;

                const arrAirportId = await Airports.findOne({
                    attribute: ["airport_id"],
                    where: { airport_city: arrAirportNm }
                });

                const depAirportId = await Airports.findOne({
                    attribute: ["airport_id"],
                    where: { airport_city: depAirportNm }
                });

                const startAiportId = arrAirportId.dataValues.airport_id;
                const endAiportId = depAirportId.dataValues.airport_id;

                await Flights.create({
                    flight_num: d.vihicleId,
                    sairport_id: startAiportId,
                    eairport_id: endAiportId,
                    company: d.airlineNm,
                    start_datetime: String(arrPlandTime),
                    end_datetime: String(depPlandTime),
                    price,
                    seat_left: seatLeft
                });
            };
            const message = "공공 데이터 API 기반 데이터 생성 완료";
            return message;

        } catch (error) {
            console.log(error)
            const errorMessage = "공공 정보 API 호출 오류";
            return errorMessage;
        }
    };
};
// 직접 실행하면 DB 연결 오류
// const test = new FlightsRepository();
// test.createFlights("NAARKJJ", "NAARKPC", 20221202).then(result => { console.log(result) });

module.exports = FlightsRepository;