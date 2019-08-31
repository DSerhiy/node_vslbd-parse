process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;
const fetch = require('node-fetch');
const fs = require("fs");

const countries = JSON.parse(fs.readFileSync('./da-desk_data/countries.json'));

fetchAgents(countries);

function fetchAgents(countries, index = 0, agents = [], page = 1) {
    
    let url = `https://switch.da-desk.com/dadesk-api/1.5/operators/130383/agents/statistics?serviceId=web/switch&serviceVersion=1.5.18.2&token=AQIC5wM2LY4Sfcz31tjeDyP6jNcaGBOMbng7fcvwmgV_nv0.*AAJTSQACMDUAAlMxAAIwMQ..*&page=${page}&size=1000&userId=serhiid&type=Agent&countryId=${countries[index].id}`;
   
    fetch(url)
    .then(res => res.json())
    .then(data => {
      agents = agents.concat(data.agents);
      
      console.log(index + 1, countries[index].name, `total:${data.pagination.total}`, `page: ${data.pagination.pageNumber}`)

      if(page < data.pagination.pages)
        fetchAgents(countries, index, agents, page + 1);
      else {
        if(index < countries.length - 1)
          fetchAgents(countries, index + 1, agents, 1);
        else {      
          fs.writeFile("./da-desk_data/agents.json", JSON.stringify(agents), err => {
            if (err) throw err;
            
            console.log('The file has been saved!');
          });
        }
      }      
    })
    .catch(err => {
      console.log(err);
    });
}