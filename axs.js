const fetch = require("node-fetch");
const fs = require("fs");

const vsldb = [
  {
    "name": "Sea-Lady",
    "type": "Bulk Carrier",
    "imo": "9266188",
    "callsign": "V7XH9",
    "mmsi": "538004485"
  }, {
    "name": "Sea-Lady-Ii",
    "type": "Yacht",
    "imo": "9096703",
    "callsign": "9HB2175",
    "mmsi": "215628000"
  }, {
    "name": "Sealand-Atlantic",
    "type": "Container Ship",
    "imo": "8212685",
    "callsign": "V7RH2",
    "mmsi": "538003504"
  },
];

getDesc(9096703);

function getDesc(imo) {
  let url = `https://axsdry.axsmarine.com/common/server/controller_tech_data.php?_dc=1566941153072&out=echo&encoder=json&IMO=${imo}&launch=get_vessel_tech_desc`;
  fetch(url , 
    { 
      headers: {
      'Cookie': 'axs-webfarm=s1; cusid=1566941528458; cuvid=c56c6b363e784d3cbdf20d8998884fac; PHPSESSID=2cc598a2db09c6ff584060738635ac91; cuvon=1566942118400; _oidc_t=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJzdWIiOiJtaWtlcnllOEBvdXRsb29rLmNvbSIsIm5vbmNlIjoiYzNmYzMyMDI1Y2IwNGRkYjdiNTE2M2RkMGE4N2Q0YjUiLCJhdF9oYXNoIjoieTJCbVlzbHNDYmJGTGttUlFneGlQdyIsInNpZCI6ImYzNzEyNTEyLTZmZDItNGIxYi1hMWMzLTY4YzI2MzE5Mzc5ZCIsImF1ZCI6IkF4c0RyeSIsImV4cCI6MTU2Njk0NTc0NSwiaWF0IjoxNTY2OTQyMTQ1LCJpc3MiOiJodHRwczovL3BvcnRhbC5heHNtYXJpbmUuY29tIn0.dIH4bSyoGElLQ2EeLnQMIwkjQw5ntnJspywa80qyEBeHRBwpBsWo2uksLxl5ygylxskiCOEAdgfHbOi9_atIgOZswHlAwvexV8zcLZ7yIrFmDM_T5rucas6Luzyv0zBQ9mpxII_SEyQV1bYhmkuf_EY6WBtZWDpiTy3QNmLfGNmSyQxvo_ejH5k42IIFQVyla4KmWmA7h8smiIwd3NfQ3DFbBs8juWwyNdzh7lOa7OQgSqzixfFhaiLbOx-WHYLcJDFFDsPVNCwDnljdojFR7E7bkz7o2iJFo_vn6nXI7uCtSsMaZW8Cl3Kgw8kcSirAhBX92KN7sKwC9Ytoyd3iDg; axsmarineV4=72fa02b6b67c90f5cccf1d1f6538c5d6286bec27; site24x7rumID=222896808513945.1566942165856'
    }
  })
    .then(res => res.text())
    .then(text => {

      console.log(text);
       
    });
}

