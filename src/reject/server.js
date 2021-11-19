var AWS = require('aws-sdk');
const db = require('./db.json');
var stepfunctions = new AWS.StepFunctions();

var name = process.env.NAME;
var address = process.env.ADDRESS;

var application = {
	"name": name,
	"address": address,
	"id" : 23
	
}

var output = {
	"result" : "Added to database",
	"data": application
}

var params = {
              taskToken: process.env.TASK_TOKEN_ENV_VARIABLE
};

params.output = JSON.stringify(output);

console.log(params);

stepfunctions.sendTaskSuccess(params, function(err, data) {
    		if (err) console.log(err, err.stack); // an error occurred
     		else     console.log(data);           // successful response
    });
