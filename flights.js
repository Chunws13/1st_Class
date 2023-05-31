const axios = require("axios");
const { Airports } = require("./models");

// 1. 공항 목록 DB 저장
const logic = async() => {

    const originUri = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList'

    const qsInfo = {
        serviceKey: "9jpj32OScBwJy8tW8t3zA4ZlEpjDK9ryJPTmiUoO8iZ5l5IcUGmB8FmgemV5wZ9NBocGFJApSw8gDwlOObRvuw==",
        // numOfRows: 100,
        _type: 'json'
    };
    const qs = new URLSearchParams(qsInfo).toString();
    const fullUri = `${originUri}?${qs}`;
    const res = await axios.get(fullUri);
    const data = res.data.response.body.items.item;
    console.log(data)
    for await (let d of data) {
        const { airportId, airportNm } = d;
        await Airports.create({ airport_code: airportId, airport_city: airportNm });
    }
}

logic();

// 추후 확인 사항
// const logic = async() => {
//     const data = await Airports.findAll({});
//     console.log(data)
//     return data
// }
// console.log(logic());