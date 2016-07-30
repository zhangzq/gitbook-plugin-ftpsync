// var ftpsync = require('ftpsync');
var exec = require('child_process').exec;


var get_config = function (gitbook, name) {
    return (gitbook.config && gitbook.config.get('pluginsConfig')[name]) || { "host": "zhiqiang.org",
       "port": "21",
       "user": "zhiqiang",
       "remote": "/domains/zhiqiang.org/public_html/note/" };
};


module.exports = {
    hooks: {
        "finish": function () {
            var gitbook = this;
            var config = get_config(this, "ftpsync");

            settings = {
                local: config.local || "_book",
                host: config.host,
                port: config.port || 21,
                remote: config.remote || '/',
                user: config.user,
                pass: config.pass,
                connections: config.connections || 1,
                ignore: config.ignore || []
            };

            var cmd = "ftpsync ";
            cmd += " -l " + settings.loccal;
            cmd += " -r " + settings.remote;
            cmd += " -h " + settings.host;
            cmd += " -p " + settings.port;
            cmd += " -u " + settings.user;
            cmd += " -s " + settings.pass;
            cmd += " -c " + settings.connections;

            exec(cmd);

            var url = 'ftp://' + settings.host + ":" + settings.port + settings.remote;
            console.log("copy '" + settings.local + "' to " + url);
        }
    }
};

// module.exports = {
    // hooks: {
        // "finish": function () {
            // var gitbook = this;
            // var config = get_config(this, "ftpsync");

            // ftpsync.settings = {
                // local: ".",
                // host: config.host,
                // port: config.port || 21,
                // remote: config.remote || '/',
                // user: config.user,
                // pass: config.pass,
                // connections: config.connections || 1,
                // ignore: config.ignore || []
            // };

            // ftpsync.log.verbose = (config.verbose || true);

            // if (ftpsync.settings.port > 65535 || ftpsync.settings.port < 1){
                // ftpsync.settings.port = 21;
            // }

            // var finish = 0;
            // ftpsync.run(function(err) {
                // if (err) console.log(err);
                // finish = 1;
            // });

            // var url = 'ftp://' + ftpsync.settings.host + ":" + ftpsync.settings.port + ftpsync.settings.remote;
            // console.log("copy '" + ftpsync.settings.local + "' to " + url);
        // }
    // }
// };

// module.exports.hooks.finish();
