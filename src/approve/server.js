var AWS = require('aws-sdk');
const db = require('./db.json');
var stepfunctions = new AWS.StepFunctions();

var id = process.env.ID;

var application = undefined;

if (typeof id !== undefined && id) {
	application = db.applications.find((applications) => applications.id === id);
}

var params = {
              output: "\"INVALID\"",
              taskToken: process.env.TASK_TOKEN_ENV_VARIABLE
};

if (typeof application !== undefined && application) {
    	params.output = "\"APPROVED\"";
	console.log(params);
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

