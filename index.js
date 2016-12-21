var request = require('request');


var options = {
  url: 'https://raw.githubusercontent.com/figassis/servernames/master/names.json',
  headers: { 'User-Agent': 'request' }
};

exports.handler = (event, context, callback) => {
    // TODO implement
    request(options, function (error, response, body) {
      if (error || response.statusCode != 200) callback("Could not retrieve names file"); 
      var names = JSON.parse(body).servernames;
      var list = [];

      if(event.hasOwnProperty('topic') && names.hasOwnProperty(event.topic)){
        list = names[event.topic];
      }else{
        Object.getOwnPropertyNames(names).forEach(function(val, idx, array) {
          list = list.concat(names[val]);
      });
      }
      
      var name = list[Math.floor(Math.random()*list.length)];
      //var result = "Call your server: " + name + '.' + event.domain;
      var result = {
        name: name,
        domain: event.domain,
        full: name + '.' + event.domain
      };
      //console.log( result );

    callback(null, result);
  });
};
