const fetch = require("node-fetch");
const fs = require("fs");

const vsldb = JSON.parse(fs.readFileSync('./vsl-db/db_C.json'));

fillVslDescription(vsldb);

function fillVslDescription(fleet, vslIndex = 0) {
  let url = `https://axsdry.axsmarine.com/common/server/controller_tech_data.php?_dc=1566941153072&out=echo&encoder=json&IMO=${fleet[vslIndex].imo}&launch=get_vessel_tech_desc`;

  const cookie = 'cuvid=c56c6b363e784d3cbdf20d8998884fac; cusid=1567016683136; cuvon=1567016686631; PHPSESSID=33597662059a66a9764410b29fa3aaab; axs-webfarm=s2; _oidc_t=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJzdWIiOiJtaWtlcnllOEBvdXRsb29rLmNvbSIsIm5vbmNlIjoiZGViNGU3YjQ5YjRlMDVhMGVhODM2NWZiZDM0YTg3ZDgiLCJhdF9oYXNoIjoiWm1ZMFB6VTBEX1RBX25wMHppYzF2USIsInNpZCI6ImU3ZWM0YTY5LTlmM2YtNDhmYS04Y2M0LWMyZWQzMjhkZTJkMSIsImF1ZCI6IkF4c0RyeSIsImV4cCI6MTU2NzAyMDMwNiwiaWF0IjoxNTY3MDE2NzA2LCJpc3MiOiJodHRwczovL3BvcnRhbC5heHNtYXJpbmUuY29tIn0.L8tsrHARjKxvHp05Gjbw6D5_WPChps0BDzh75Gsm7J_SBeCnFU9x5OPuKHM_sEUWGABiRyMVNUPN_reKgEDnWLhimL5EToFEw2GvER7am0WuxNpO6K1q714Lr5FhosiPDTTxJjtktZROekCT58lqy6eWMReQ6uPfHsxYK9zWUiomV6Jko3VlGARj4GR1YjXewxP3fHoTCNeSH9AXtFt_knFQUAMz3WPu530hF0Zd732b2ivueQuVvEASm4catGq8sk70FHykxNQ8RisAICsFOySDwlaDg9do0ALO3UjlZhYutOH0vu_uz9W0Lyshstr7PzolPMV9bWmmN1CKZcSFLw; axsmarineV4=1cede3f455c38333a734cafa188a251fdd177c89; site24x7rumID=222896808513945.1567016709096'
  
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
        fs.writeFile("./vsl-descr/fleet_C.json", JSON.stringify(fleet), err => {
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

