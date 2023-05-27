const request = require("request");
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

const findPort = 'http://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getArprtList?serviceKey=9jpj32OScBwJy8tW8t3zA4ZlEpjDK9ryJPTmiUoO8iZ5l5IcUGmB8FmgemV5wZ9NBocGFJApSw8gDwlOObRvuw%3D%3D&_type=json';
request.get({ uri: findPort }, function(error, response, body) {
    const data = JSON.parse(body);
    console.log(data.response.body.items.item)
});