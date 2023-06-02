const { Flights, Airports } = require("../models");
const { Op } = require("sequelize");
const makeRandom = require("../utils/mkRandomNum");
const makeDate = require("../utils/stringToDate");
const govApi = require("../utils/govApi");


class FlightsRepository {

    findAirports = async() => {
        try {
            const airports = await Airports.findAll({
                attributes: ["airport_id", "airport_city", "airport_code"]
            });
            return airports

        } catch (error) {
            const errorMessage = "공항 정보 조회에 실패했습니다.";
            return errorMessage;
        }
    };

    // db에서 해당 조건에 맞는 데이터 있는지 확인
    findFlights = async(sairport_id, eairport_id, start_datetime, people_num) => {
        try {
            const newDate = new makeDate(start_datetime);
            const newDate2 = new makeDate(start_datetime);

            const startDate = newDate.mkDate();
            const afterOneDate = newDate2.mkDate();

            afterOneDate.setDate(afterOneDate.getDate() + 1);

            const flights = await Flights.findAll({
                attributes: ["flight_id", "flight_num", "company", "sairport_id", "eairport_id",
                    "start_datetime", "end_datetime", "price", "seat_left"
                ],
                where: {
                    [Op.and]: [
                        { sairport_id },
                        { eairport_id },
                        {
                            start_datetime: {
                                [Op.gte]: startDate
                            }
                        },
                        {
                            start_datetime: {
                                [Op.lt]: afterOneDate
                            }
                        },
                        {
                            seat_left: {
                                [Op.gte]: people_num
                            }
                        }
                    ]
                },
                include: [{
                    model: Airports,
                    attributes: ["airport_id", "airport_city", "airport_code"],
                    as: "start_airport"
                }, {
                    model: Airports,
                    attributes: ["airport_id", "airport_city", "airport_code"],
                    as: "end_airport"
                }]
            });
            return flights;

        } catch (error) {
            console.log(error);
            const errorMessage = "DB 정보 조회 실패";
            return errorMessage;
        }
    };

    // // 없으면 API로 호출 후 저장, 좌석 수 1 ~ 50석 랜덤 배치
    createFlights = async(sairport_id, eairport_id, start_datetime) => {
        try {

            // ID로 받아 Code로 치환
            const startCityName = await Airports.findOne({
                attribute: ["airport_city"],
                where: { airport_id: sairport_id }
            });

            const endCityName = await Airports.findOne({
                attribute: ["airport_city"],
                where: { airport_id: eairport_id }
            });

            // req 문자로 받으나, 조회는 Number로 해야함.
            const start_date = Number(start_datetime.substr(0, 8));

            // 공공 데이터 포털에서 가져오기
            let res = await govApi(startCityName.dataValues.airport_code, endCityName.dataValues.airport_code, start_date);
            const data = res.data.response.body.items.item;
            console.log(data)
            for await (let d of data) {
                // 남은 자리, 비용 난수 생성
                const seatLeft = makeRandom(1, 50);
                const price = makeRandom(100, 500) * 1000;

                const { arrAirportNm, depAirportNm, arrPlandTime, depPlandTime } = d;

                // 이름 기준으로 공항 ID 찾기
                const depAirportId = await Airports.findOne({
                    attribute: ["airport_id"],
                    where: { airport_city: depAirportNm }
                });

                const arrAirportId = await Airports.findOne({
                    attribute: ["airport_id"],
                    where: { airport_city: arrAirportNm }
                });

                // response 데이터 에서 공항 ID 찾기
                const startAiportId = depAirportId.dataValues.airport_id;
                const endAiportId = arrAirportId.dataValues.airport_id;

                // 
                const start_time = new makeDate(String(depPlandTime));
                const end_time = new makeDate(String(arrPlandTime));

                await Flights.create({
                    flight_num: d.vihicleId,
                    sairport_id: startAiportId,
                    eairport_id: endAiportId,
                    company: d.airlineNm,
                    start_datetime: start_time.mkDatetime(),
                    end_datetime: end_time.mkDatetime(),
                    price,
                    seat_left: seatLeft
                });
            };
            const message = "공공 데이터 API 기반 데이터 생성 완료";
            console.log(message)
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