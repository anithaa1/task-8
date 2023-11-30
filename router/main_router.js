const apiRoute = require('../router/router');

const init = (server) => {
    server.use('/api/v1', apiRoute);
}
module.exports = {
    init: init
};