var AWS = require('aws-sdk');
const db = require('./db.json');
var stepfunctions = new AWS.StepFunctions();

var id = process.env.ID;

var application = undefined;

if (typeof id !== undefined && id) {
	application = db.applications.find((application) => application.id == id);
}

var params = {
              taskToken: process.env.TASK_TOKEN_ENV_VARIABLE
};

var output = {
	"result": "NOT APPROVED",
}	

if (typeof application !== undefined && application) {
	output.result = "APPROVED";
	output.data = application;
    	params.output = JSON.stringify(output);
	console.log(params);
    	stepfunctions.sendTaskSuccess(params, function(err, data) {
    		if (err) console.log(err, err.stack); // an error occurred
     		else     console.log(data);           // successful response
    });
} else {
	output.data = {};
	params.output = JSON.stringify(output);
	console.log(params);
  	stepfunctions.sendTaskSuccess(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
        	else     console.log(data);           // successful response
	});
}
