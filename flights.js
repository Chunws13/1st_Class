const request = require("request");
const { Airports } = require("./models");
// const xml2js = require("xml2js");

// const endPoint = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService';
// const screctKey = '9jpj32OScBwJy8tW8t3zA4ZlEpjDK9ryJPTmiUoO8iZ5l5IcUGmB8FmgemV5wZ9NBocGFJApSw8gDwlOObRvuw%3D%3D';

// request.get({ uri: uri }, function(error, response, body) {
//     console.log("response");
//     console.log(response);
//     console.log("body");
//     console.log(body);
// });

// 1. 공항 목록 DB 저장
// const findPort = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList?serviceKey=9jpj32OScBwJy8tW8t3zA4ZlEpjDK9ryJPTmiUoO8iZ5l5IcUGmB8FmgemV5wZ9NBocGFJApSw8gDwlOObRvuw%3D%3D&_type=json';
// request.get({ uri: findPort }, function(error, response, body) {
//     const data = JSON.parse(body);
//     const next_data = data.response.body.items.item;

// const logic = next_data.map(async(element) => {
//     const { airportId, airportNm } = element;
// const data = await Airports.findOne({
//     where: { airportId, airportNm }
// })

// await Airports.create({ airport_code: airportId, airport_city: airportNm });
// });
// });

const logic = async() => {
    const data = await Airports.findAll({});
    console.log(data)
    return data
}
console.log(logic());