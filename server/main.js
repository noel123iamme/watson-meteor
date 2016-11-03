import { Meteor } from 'meteor/meteor';
import PersonalityInsightsV3 from 'watson-developer-cloud/personality-insights/v3.js';

var analyzeJSON = require("./resources/analyze.json");
// console.log(JSON.stringify(analyzeJSON, null, ' '));

var credentials = {
  "password": "PlKAezi1cou6",
  "username": "d2c30301-669c-450b-9a91-bdf9bc00ecc3",
  "version_date": '2016-10-19'
};

var personality_insights = new PersonalityInsightsV3(credentials);

var params = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    },
    content_items: analyzeJSON,
    consumption_preferences: true  
};

var pipJSON = personality_insights.profile(params,
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      return response;
});
console.log(JSON.stringify(pipJSON, null, ' '));

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'personalityInsight': function() {
    return pipJSON;
  }
});
