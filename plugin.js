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
        var message = _.clone(event);
        var buffer =  new Buffer(JSON.stringify(message));
        socket.send(buffer, 0, buffer.length, logstash.port, logstash.host, function(err) {
            socket.close();            
            if (err) return logger.error('Error forwarding event to logstash server on %s:%s - %s', logstash.host, logstash.port, err.message);
        });
    });


    next(null, plugin);
}