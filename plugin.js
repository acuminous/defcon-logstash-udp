var dgram = require('dgram');
var _ = require('lodash');

module.exports.create = create;

function create(context, next) {

    var plugin = {
        name: 'Logstash UDP'
    }    

    var logstash = context.config.logstash
    var logger = context.logger;

    context.defcon.on('event', function(event) {
        var socket = dgram.createSocket(logstash.protocol || 'udp4'); 
        var message =  new Buffer(JSON.stringify(event));
        socket.send(message, 0, message.length, logstash.port, logstash.host, function(err) {
            socket.close();            
            if (err) return logger.error('Error forwarding event to logstash server on %s:%s - %s', logstash.host, logstash.port, err.message);
        });
    });


    next(null, plugin);
}