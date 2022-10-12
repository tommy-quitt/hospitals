const airtable = require('airtable');
const twilio = require('twilio');
const _ = require('lodash');

exports.handler = function (context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  // twiml.say("Hello World");

  const base = new airtable({
    apiKey: context.AIRTABLE_API_KEY,
  }).base(context.AIRTABLE_BASE_ID);

  const hospitalName = event.hospitalName.toLowerCase();

  return base('Hospitals')
    .select({ Name: hospitalName })
    .all()
    .then((records) => {
      const oldRecord = records[0];
      base('Hospitals').update(oldRecord.id, { load: event.load });
    });

  callback(null, twiml);
};
