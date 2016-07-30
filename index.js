var ftpsync = require('ftpsync');

var get_config = function (gitbook, name) {
    config = gitbook.config.get('pluginsConfig')[name] || {};
};

module.exports = {
    hooks: {
        "finish": function () {
            var gitbook = this;
            var config = get_config(this, "ftpsync");

            ftpsync.settings = {
                local: config.public_dir,
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

            ftpsync.run();
        }
    }
};
