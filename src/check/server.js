var AWS = require('aws-sdk');
const db = require('./db.json');
var stepfunctions = new AWS.StepFunctions();

var name = process.env.NAME;
var address = process.env.ADDRESS;

var application = undefined;

if (typeof name !== undefined && name) {
	application = db.applications.find((application) => application.name === name);
}else {
	if (typeof address !== undefined && address) {
		application = db.applications.find((application) => application.address === address);
	}
}

var output = {
	"result": "INVALID",
}	

var params = {
              taskToken: process.env.TASK_TOKEN_ENV_VARIABLE
};


if (typeof application !== undefined && application) {
	output.result = "VALID";
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
