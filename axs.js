const fetch = require("node-fetch");
const fs = require("fs");

const vsldb = JSON.parse(fs.readFileSync('./vsl-db/db_T.json'));

fillVslDescription(vsldb);

function fillVslDescription(fleet, vslIndex = 0) {
  let url = `https://axsdry.axsmarine.com/common/server/controller_tech_data.php?_dc=1566941153072&out=echo&encoder=json&IMO=${fleet[vslIndex].imo}&launch=get_vessel_tech_desc`;

  const cookie = 'cusid=1567163074993; cuvid=c33f361e16504ea5b725c29d9aa20cad; cuvon=1567163079414; PHPSESSID=c7d7a85381230a3946446aed694b957c; axs-webfarm=s2; _oidc_t=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNpZy1ycy0wIn0.eyJzdWIiOiJtaWtlcnllOEBvdXRsb29rLmNvbSIsIm5vbmNlIjoiMWJhYmI0ZGI4MTM5ZWYxMmI4ZjE5ZDRlYjlkZTQwOTciLCJhdF9oYXNoIjoiWW9FYnVzOW9mYldUcndGZzQ2WlNzUSIsInNpZCI6IjE5Zjk1MmMwLTA3NDAtNDAyZC1hNDdjLWZlNDQzZmI2OTkwZiIsImF1ZCI6IkF4c0RyeSIsImV4cCI6MTU2NzE2NjY5OSwiaWF0IjoxNTY3MTYzMDk5LCJpc3MiOiJodHRwczovL3BvcnRhbC5heHNtYXJpbmUuY29tIn0.J66O9tTvFwb45k6eDMZYJ5KU2V88Q9ESsZbXVkx8Q1V1bnPHs2overzN3R320Gf0lAzdBYwqmcoxrPZjOgRZLg7z_SN-Ubc9a7Ex3KOKYRRhpYmV0xdVE3HoqCzmsGP4v0dpC0fCfOiFGJQ-KxvzzO1uDHqoIWItpWRtDBVlxBu8IvBoKvSXjRMtsZ34yMbkOwrc8GXF6VpIuSQmU1KamVVj67LKwZgXgJ0SHBxL-Wd93Fvdp7oAvOvG53iu3v61dh9DMfVXFd8FHx8uYeX425figfgQCCwdlbfYJC-Wc74X34y2O_PxwLjkQY_b0uel3RgEvZUeAqR6HpXzwqqejA; axsmarineV4=5b85671309ae6765f82bbd70e5634154f174b41d; site24x7rumID=595436777426977.1567163104774'
  
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
        fs.writeFile("./vsl-descr/fleet_T.json", JSON.stringify(fleet), err => {
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

