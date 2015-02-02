module.exports = function(config) {
  var express         = require('express')
    , requestVerifier = require('./request_verifier')(config)
    , requestHandler  = require('./request_handler')
    , errorhandler = require('errorhandler')
    , ret;

  var receptor = express();

  receptor.use(errorhandler({ dumpExceptions: true, showStack: true }));

  receptor.get('/', requestVerifier, requestHandler);

  ret = requestHandler.emitter;

  ret.start = function(callback) {
    receptor.listen(config.receptor.port, config.receptor.host, callback);
  };

  ret.stop = function() {
    receptor.close();
  };

  ret.server = receptor;
  
  return ret;
}
