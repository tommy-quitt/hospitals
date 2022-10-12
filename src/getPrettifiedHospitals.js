const airtable = require('airtable');
const _ = require('lodash');
require('dotenv').config();

// exports.handler = function (context, event, callback) {
const fun = (context, event, callback) => {
  const parseHospitals = (hospitals) => {
    const texts = hospitals.map((hospital) => {
      return `${hospital.HospitalNumber} - ${hospital.Name} ${hospital.Load} אמבולנסים ממתינים(${hospital.LastModified})`;
    });
    const text = _.join(texts, '\n');
    return text;
  };

  const base = new airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID);
  base('Hospitals')
    .select()
    .all()
    .then((hospitals) => {
      res = hospitals.map((record) => record.fields);
      console.log(res);
      console.log(parseHospitals(res));
      // callback(null, parseHospitals(res));
    });
};

// const parseHospitals = (hospitals) => {
//   const texts = hospitals.map(
//     (hospital) =>
//       `${hospital.HospitalNumber} - ${hospital.Name} ${hospital.Load} אמבולנסים ממתינים`
//   );
//   const text = _.join(texts, '\n');
//   return text;
// };

fun();
