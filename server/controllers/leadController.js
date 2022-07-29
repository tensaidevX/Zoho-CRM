const Lead = require("../models/lead");

const REFRESH_TOKEN =
  "1000.6e93e2865653748f31180657869f867c.8279aab8356aeee82b92ca8054ed41f1";
const CLIENT_ID = "1000.0GBPKHNM0AXC9T9VGYSKO5Z7V7NA1V";
const CLIENT_SECRET = "b84b85da242e8aff62b8116797d0d072f8593ad324";
const ACCESS_TOKEN = "" ;
async function getToken() {

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://accounts.zoho.in/oauth/v2/token");

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  
  let data = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
    grant_type: "refresh_token",
  };

  xhr.send(data);

  xhr.onload = () => {
    if(xhr.response.access_token){
        return xhr.response.access_token ;
    }
    
  };

}


async function getLeadsData(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.zohoapis.in/crm/v3/Leads?fields=Last_Name,Email,First_Name,Phone,Lead_Source");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader('Authorization', 'Zoho-oauthtoken ' + ACCESS_TOKEN);    
    xhr.send(data);
    xhr.onload = () => {
      if(xhr.response){
          return xhr.response ;
      }else if(xhr.response.status = "error"){
        ACCESS_TOKEN = await getToken(); 
        getLeads() ;
      }else{
        console.log(err , "error while fetching data from zoho-api");
          return res.status(500).json({
            message:"Internal Server Error"
          });
      }
    };
}


module.exports.getLeads = function (req, res) {

    if(!ACCESS_TOKEN){
        ACCESS_TOKEN = await getToken(); 
    }
    
    let lead_data =  await getLeadsData();  
    
    if(lead_data){
        let lead_sources = [] ;
        let source_data = {}
        lead_data.data.forEach(element => {
            if(lead_sources.indexOf(element.Lead_Source)!=-1){
                source_data[element.Lead_Source] += 1; 
            }else{
                lead_sources.push(element.Lead_Source)
                source_data[element.Lead_Source] = 1; 
            }
        });

        try {
             let leads = await Lead.create({
                leads : lead_data ,
                source_data : source_data
            });
       
      
            return res.status(200).json({
              data: {
                leads : leads.leads,
                source_data:source_data,
                success: true,
              }
              
            });
          }  
         catch (err) {
          console.log(err , "error creating leads data in database");
          return res.status(500).json({
            message:"Internal Server Error"
          });
        }
    
};      
    

};
