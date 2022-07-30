const Lead = require("../models/lead");
const axios = require("axios");
const REFRESH_TOKEN =
  "1000.77150d57da1bcc5282e54cbff7ac70ff.4d699387124e71bf7d907dc4407ff5c4";
const CLIENT_ID = "1000.XQO5DXM8FA550TKI8VS08N6MYP6G9D";
const CLIENT_SECRET = "3721b6d1142553c2560af69c1e0194a3728d3497e1";

async function getToken() {
  var axios = require("axios");
  var qs = require("qs");
  var data = qs.stringify({
    refresh_token: REFRESH_TOKEN,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  var config = {
    method: "post",
    url: "https://accounts.zoho.in/oauth/v2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "6e73717622=94da0c17b67b4320ada519c299270f95; JSESSIONID=B07514D66111CAB9FDAF5A33DB62A08A; _zcsr_tmp=cccbb2d4-02c3-4d93-8f92-87c79ea8d3a4; iamcsr=cccbb2d4-02c3-4d93-8f92-87c79ea8d3a4",
    },
    data: data,
  };
  try {
    const LeadsData = axios(config)
      .then(function (response) {
        return response.data.access_token;
      })
      .then((token) => getLeadsData(token))
      .then((response) => response)
      .then((data) => data)
      .catch((error) => {
        console.log(error, "error fetching token");
        return;
      });

    return LeadsData;
  } catch (error) {
    console.log(error);
  }
}

async function getLeadsData(token) {
  console.log("token created succesfully", token);
  var axios = require("axios");
  var config = {
    method: "get",
    url: "https://www.zohoapis.in/crm/v3/Leads?fields=Last_Name,Email,First_Name,Phone,Lead_Source,Company",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      Cookie:
        "941ef25d4b=d16f6d74e181d707cab78a2293ae8754; _zcsr_tmp=199369e7-ce96-43f3-8052-5fdc4d53d876; crmcsr=199369e7-ce96-43f3-8052-5fdc4d53d876",
    },
  };
  try {
    const response = axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch((error) => console.log(error));

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports.getLeads = async function (req, res) {
  let lead_data = await getToken();

  if (lead_data) {
    let lead_sources = [];
    let source_data = {};
    lead_data.data.forEach((element) => {
      if (lead_sources.indexOf(element.Lead_Source) != -1) {
        source_data[element.Lead_Source] += 1;
      } else {
        lead_sources.push(element.Lead_Source);
        source_data[element.Lead_Source] = 1;
      }
    });

    try {
      let leads = await Lead.create({
        leads: lead_data.data,
        source_data: source_data,
      });

      return res.status(200).json({
        data: {
          leads: leads.leads,
          source_data: source_data,
          success: true,
        },
      });
    } catch (err) {
      console.log(err, "error creating leads data in database");
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};
