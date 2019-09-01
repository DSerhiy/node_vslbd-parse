const fetch = require("node-fetch");
const fs = require("fs");

const vsldb = JSON.parse(fs.readFileSync('./vsl-db/db_Z.json'));

fillVslDescription(vsldb);

function fillVslDescription(fleet, vslIndex = 0) {
  let url = `https://axsdry.axsmarine.com/common/server/controller_tech_data.php?_dc=1566941153072&out=echo&encoder=json&IMO=${fleet[vslIndex].imo}&launch=get_vessel_tech_desc`;

  const cookie = 'cuvid=c56c6b363e784d3cbdf20d8998884fac; axs-webfarm=s2; PHPSESSID=ad817e3f86076ab92bdf012bcbb6f72c; _oidc_t=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJzdWIiOiJtaWtlcnllOEBvdXRsb29rLmNvbSIsIm5vbmNlIjoiOGRjNzM4ODI2OWRlNjg4ODRlNThhN2U4N2RkNmFhOGEiLCJhdF9oYXNoIjoiaXBObm9XNDFHMVB6b25pNHY2QXdKdyIsInNpZCI6ImZjMWUyNmMwLTE4MzctNDI0Yy04ZmEyLTAyODUxNzRhOTBjZSIsImF1ZCI6IkF4c0RyeSIsImV4cCI6MTU2NzE5NjA0NywiaWF0IjoxNTY3MTkyNDQ3LCJpc3MiOiJodHRwczovL3BvcnRhbC5heHNtYXJpbmUuY29tIn0.q9C29a8I-1gEVhoZBVSK-w7UuKQWXfaB00TiW-BGmke0EYAjiyzMJkyn_-ghDpevEXVeRDJK3hVbmhcE9HLO92HcypPb-6UlDY4BP8p_a8P6FwwtBtIZd9XqseBXCYoKv2uzX_Dju5KJReBHaO_UJXWyIkylv0_CnzBdB9Hh6r3rdsvgfUOqtXF-l2xpyesxyGh1YvI1E5wAm6f5xxs5EYIsxhyxuGOKGMg6faET6_QosfFMaGehmvsbeddhIBBDMVr1SNZM06weAcKLAPQkiaNgdk8kEaUdsbm2o8lquBneQD-fEXfRC9gwuIiXF59MmO0caE3TFJYS5rMwxo1PUA; axsmarineV4=c19d43b88d1a828f3cfda5a4c07e717672a659bb; site24x7rumID=222896808513945.1567192444745'
  
  fetch(url, 
    { 
      headers: {
      'Cookie': cookie
    }})
    .then(res => res.json())
    .then(data => {
      if(data === 'failed')
        console.log('data failed')
       
      console.log(vslIndex + 1);  
      fleet[vslIndex].description = data.vdDesc;
      
      if(vslIndex === fleet.length - 1) {        
        fs.writeFile("./vsl-descr/fleet_Z.json", JSON.stringify(fleet), err => {
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

