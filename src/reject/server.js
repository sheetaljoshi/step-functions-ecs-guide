var AWS = require('aws-sdk');
const db = require('./db.json');
var stepfunctions = new AWS.StepFunctions();

var params = {
              output: "\"Added to database\"",
              taskToken: process.env.TASK_TOKEN_ENV_VARIABLE
};

stepfunctions.sendTaskSuccess(params, function(err, data) {
    		if (err) console.log(err, err.stack); // an error occurred
     		else     console.log(data);           // successful response
    });
