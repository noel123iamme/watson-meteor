import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var profileJSON = require("./resources/profile.json");

function pre(data) {
  return JSON.stringify(data, null, ' ');
}

Template.watson.onRendered(function watsonOnRendered() {
  var chart = new PersonalitySunburstChart('sunburstChart');
  chart.show(profileJSON, './resources/profile_photo.jpg');
});

Template.watson.helpers({
  profile() {
    return pre(profileJSON);
  },

  behaviors() {
    var personalityBehaviors = new PersonalityBehaviors('en');
    return personalityBehaviors.behaviors(profileJSON);
  },

  personality() {
    return pre(Meteor.call('personalityInsight'));
  }
});

