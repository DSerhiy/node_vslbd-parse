const fetch = require("node-fetch");
const fs = require("fs");

const vsldb = JSON.parse(fs.readFileSync('./fleet.json'));

fillVslDescription(vsldb);

function fillVslDescription(fleet, vslIndex = 0) {
  let url = `https://axsdry.axsmarine.com/common/server/controller_tech_data.php?_dc=1566941153072&out=echo&encoder=json&IMO=${fleet[vslIndex].imo}&launch=get_vessel_tech_desc`;
  const cookie = 'cuvid=cc1400b0579a4acf8ffee929919c37a0; PHPSESSID=a7258933c1760686904af12e524411d7; axs-webfarm=s1; cusid=1566999213117; cuvon=1566999217147; _oidc_t=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJzdWIiOiJtaWtlcnllOEBvdXRsb29rLmNvbSIsIm5vbmNlIjoiYWEwYjRmMDBmZWJhOWIzN2UzY2JjMzliZWQxMDViYzAiLCJhdF9oYXNoIjoiVTlOMW5CbkZJNi1yUFNON1NyZE03QSIsInNpZCI6IjRhNmM3ZGMzLTM2M2EtNDdlMC1iMjE0LTFiNzU4YmM5N2I2MCIsImF1ZCI6IkF4c0RyeSIsImV4cCI6MTU2NzAwMjgzOCwiaWF0IjoxNTY2OTk5MjM4LCJpc3MiOiJodHRwczovL3BvcnRhbC5heHNtYXJpbmUuY29tIn0.CZaLs0SZ87FYtYm8n1hJeJpHPWIi0OaNc9wCvelJ7Sfh842sv9ls5XygIY3Bxg9Dri7GnFl5PDiMjPvrEU9IEQKp08bj33JN1VsenVWIL7DMB0-hJr-RTWSwpN1qlasB8IezBM2TBE_rVbDdwrnQNUWvyZUHnworN0JF_2f-9vqcIv-QhFcWK9mxkcUfG2Ivbju0VJunWum07LMQVMX4V89LhOiARkBENDNc8t0CF2sZdcoIG6Z3TeZgr5su35snQEX4FfEZEZGI164zKhw4goyLGux_e4JX3YcpP6IaS48fniTBvL6UL-uwwVV4yQwng8ChCv9yvZhhEgYSPYlzsw; axsmarineV4=ebff1b9f13f6d387edc25b5053c7d9f09d759d3b; site24x7rumID=489770796246437.1566999242242'
  
  fetch(url, 
    { 
      headers: {
      'Cookie': cookie
    }})
    .then(res => res.json())
    .then(data => {
      if(data === 'failed')
        console.log('data failed')
        
      fleet[vslIndex].description = data.vdDesc;
      
      if(vslIndex === fleet.length - 1) {
        
        fs.writeFile("fleet_desc.json", JSON.stringify(fleet), err => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
      else {
        fillVslDescription(fleet, vslIndex + 1);
      }    
    })
    .catch(err => console.log(err));
}

