# DEFCON Logstash UDP Plugin

## Prerequisits
1. [DEFCON](http://github.com/acuminous/defcon)
1. [logstash](http://logstash.net)

## Installation
1. ```cd $DEFCON_INSTALL_DIR```
2. ```npm install defcon-logstash-udp```
3. Enable and configure 'defcon-logstash-udp' in your DEFCON configuration file, e.g.
```json
{
    "plugins": {
        "installed": [
            "defcon-logstash-udp"
        ],
        "defcon-logstash-udp": {
            "host": "localhost",
            "port": 9999
        }
    }
}
```
4. Restart defcon (you can do this via ```kill -s USRSIG2 <pid>``` if you want zero downtime)

## Configuration

The plugin configuration options are only host, port and protocol (which can be either 'udp4' or 'udp6'). A basic logstash configuration is as follows:-
```ruby
input { 
    udp {
        port => 9999
        codec => json
    }
}
output { 
    stdout {
        codec => json
    }
}
```
