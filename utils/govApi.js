const axios = require("axios");
require('dotenv').config({ path: "../.env" });
const env = process.env;

module.exports = async(sairport_id, eairport_id, start_datetime) => {
    const originUri = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getFlightOpratInfoList'

    const qsInfo = {
        serviceKey: env.GOVAPIKEY,
        depAirportId: sairport_id,
        arrAirportId: eairport_id,
        depPlandTime: start_datetime,
        numOfRows: 100,
        _type: 'json'
    };
    const qs = new URLSearchParams(qsInfo).toString();
    const fullUri = `${originUri}?${qs}`;

    const res = await axios.get(fullUri);
    return res;
};