const csvtojsonV2 = require("csvtojson");

const csvFilePath = './test.cvs';

csvtojsonV2()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		console.log(jsonObj);
	});
