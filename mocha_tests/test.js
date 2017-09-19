var expect = require('chai').expect;
var request = require('request');
var URL = "https://www.googleapis.com/books/v1/volumes?q=holes";


// Testing to see that the api is responding
describe("Shakes", function() {
	var apiError,apiResponse,apiBody;
	before(function(done) {
			request(URL, function(error, response, body) {
				apiError = error;
				apiResponse = response;
				apiBody = body;
				done();
			});
	});
	it("should return 200 - OK", function() {
			expect(apiResponse.statusCode).to.equal(200);
	});
// Testing that the api response is not empty 
it("should have a sentence in the body", function(){
		if(typeof(apiBody)=== "string") {
		apiBody = JSON.parse(apiBody);
		}
	console.log(apiBody);
		expect(apiBody).to.not.be.empty;
	});
});

