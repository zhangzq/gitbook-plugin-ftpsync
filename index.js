var ftpsync = require('ftpsync');

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

            ftpsync.settings = {
                local: ".",
                host: config.host,
                port: config.port || 21,
                remote: config.remote || '/',
                user: config.user,
                pass: config.pass,
                connections: config.connections || 1,
                ignore: config.ignore || []
            };

            ftpsync.log.verbose = (config.verbose || false);

            if (ftpsync.settings.port > 65535 || ftpsync.settings.port < 1){
                ftpsync.settings.port = 21;
            }

            ftpsync.run(function(err, result) {
                console.log(err);
                console.log(result);
            });
            var url = 'ftp://' + ftpsync.settings.host + ":" + ftpsync.settings.port + ftpsync.settings.remote;
            console.log("copy '" + ftpsync.settings.local + "' to " + url);
        }
    }
};

module.exports.hooks.finish();
