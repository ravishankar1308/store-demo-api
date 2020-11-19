const store = require("../controllers/store.controller");
const VerifyToken =require('../middlewares/VerifyToken');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization');
        next();
    });

    app.post(
        "/api/store",
        VerifyToken,
        store.create
    );

    app.get("/api/store",
        VerifyToken,
        store.findAll);

    app.get("/api/store/:id",
        VerifyToken,
        store.findById
    );

    app.put(
        "/api/store",
        VerifyToken,
        store.updateById
    );

    app.delete(
        "/api/store/:id",
        VerifyToken,
        store.delete
    );
};
