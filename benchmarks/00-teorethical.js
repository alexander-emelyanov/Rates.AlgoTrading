/**
 * Dependencies
 */
var http = require('http');
var agent = http.Agent();

// Agent default to max sockets of 5, we need more
agent.maxSockets = Infinity;

// create more, agents un till we have enough
for(var i = 0; i < 4000; i++){
    http.get({
        agent: agent
        , path: '/'
        , port: 8080
        , host: '127.0.0.1'
    });

    console.log("Client connected: " + i);
}