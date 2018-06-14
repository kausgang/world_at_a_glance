var fs = require("fs");
var path = require('path');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

// need this to parse csv
  var host = req.headers.host; 


console.log(host);

  var year = req.query.year;
  console.log(year);

  get_content(year,host,res);
});

function get_content(year,host,res){

  var filename = path.join(__dirname,'../public/DATABASE/'+year+'.json');

  // console.log(filename);

  

  var content = fs.readFileSync(filename);

  var data = JSON.parse(content);
  // console.log(data);


  //get the country name and write in a file for d3
  
  var country_filename = path.join(__dirname,'../public/country.csv');
  fs.writeFileSync(country_filename,'country\n') //CREATING HEADER FOR THE CSV FILE
  var i =1; //first value is "year"

  Object.keys(data).forEach(function(key){
    var value = data[key];
    // console.log(key + ':####' + value);
     
    if(i!=1) //THE FIRST VALUE IS "year"
    fs.appendFileSync(country_filename,key+'\n');
    i++;
    
  });


  var csv_filename = 'http://'+host+'/country.csv';

  res.send(csv_filename); //sending the url to access the file on server, sometimes  chrome cannlot load local file in 
}
module.exports = router;