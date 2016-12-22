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
      
      var domain = (event.hasOwnProperty('domain'))?event.domain.toLowerCase():'yourdomain.com';
      var name = list[Math.floor(Math.random()*list.length)];
      name = name.toLowerCase();
      
      var result = {
        name: name,
        domain: domain,
        full: name + '.' + domain
      };
      
    callback(null, result);
  });
};
