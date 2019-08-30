const fetch = require("node-fetch");
const fs = require("fs");

const abc = 'ABCDEFGHIKLMNOPQRSTVXYZ';

getCountiers();

function getCountiers() {
  let url = `https://switch.da-desk.com/dadesk-api/1.5/countries?serviceId=web/switch&serviceVersion=1.5.18.2&token=AQIC5wM2LY4Sfcz_zTfjOT-T__uQesbJUxKfgdZpEcNBpn4.*AAJTSQACMDUAAlMxAAIwMQ..*&name=A`;
  const cookie = 'iPlanetDirectoryPro=AQIC5wM2LY4Sfcz_zTfjOT-T__uQesbJUxKfgdZpEcNBpn4.*AAJTSQACMDUAAlMxAAIwMQ..*; ajs_group_id=null; ajs_anonymous_id=%221bede11f-7884-409e-b460-6ac4cff03cab%22; ajs_user_id=%22serhiid%22; _ga=GA1.2.776706179.1567153600; _gid=GA1.2.831572467.1567153600; lc_sso10078455=1567153600947'
  
  
  fetch(url, { 
    headers: {
    'Cookie': cookie, 
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3', 
    'Accept-Encoding': 'gzip, deflate, br'
  }})
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}