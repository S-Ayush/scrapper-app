import axios from "axios";
import { ScrapingBeeClient } from "scrapingbee";
import * as cheerio from "cheerio";

const safeBrowsingApi = (url) =>
  axios.post(
    "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyCJHbrQxvi3CBefc7O5l3JLg2SFNddXyc0",
    {
      client: {
        clientId: "testing",
        clientVersion: "1.5.2",
      },
      threatInfo: {
        threatTypes: [
          "MALWARE",
          "SOCIAL_ENGINEERING",
          "UNWANTED_SOFTWARE",
          "MALICIOUS_BINARY",
        ],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }, { url: "http://www.urltocheck1.org/" }],
      },
    }
  );

const getScrappingData = async (url) => {
  var client = new ScrapingBeeClient(
    "NGJOGME8B3PXU9GX6DF9SC3U36DDIPCMBVJEJB2ED2G93MQZBBATLQ2OG7UD84SM7UKT6JLHT19WL1B9"
  );
  var response = await client.get({
    url: url,
    params: {},
  });
  return response;
};

const getCheerioData = (data) => {
  return cheerio.load(data);
};

export { safeBrowsingApi, getScrappingData, getCheerioData };
