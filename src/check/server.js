var AWS = require('aws-sdk');
const db = require('./db.json');
var stepfunctions = new AWS.StepFunctions();

var name = process.env.NAME;

var data = db.applications.find((applications) => applications.name === name);

var params = {
	          output: "Invalid",
	          taskToken: process.env.TASK_TOKEN_ENV_VARIABLE
};

if (typeof data !== undefined && data) {

	params.output = data.name;
stepfunctions.sendTaskSuccess(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
});

} else {

stepfunctions.sendTaskSuccess(params, function(err, data) {
	          if (err) console.log(err, err.stack); // an error occurred
	          else     console.log(data);           // successful response
});


}
