
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const fetch = require('node-fetch');
const fs = require("fs");

fillCountries();

function fillCountries(countries = [], letterIndex = 0) {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let url = `https://switch.da-desk.com/dadesk-api/1.5/countries?serviceId=web/switch&serviceVersion=1.5.18.2&token=AQIC5wM2LY4Sfcz_zTfjOT-T__uQesbJUxKfgdZpEcNBpn4.*AAJTSQACMDUAAlMxAAIwMQ..*&name=${abc[letterIndex]}`;
   
    fetch(url)
    .then(res => res.json())
    .then(data => {
      countries = countries.concat(data.countries);

      if(abc[letterIndex] !== 'Z')
        fillCountries(countries, letterIndex + 1);
      else {      
        fs.writeFile("./da-desk_data/countries.json", JSON.stringify(countries), err => {
          if (err) throw err;
          
          console.log('The file has been saved!');
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}