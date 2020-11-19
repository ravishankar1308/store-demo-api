const Store = require('../models/store.model');

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.storeName) {
        await res.status(400).send("Store Name can not be empty!");
        return;
    }
    const store = await new Store({
        storeName: req.body.storeName
    });
    await store
        .save(store)
        .then(data => {
          return res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        });


};

exports.findAll = (req, res) => {
    const storeName = req.query.storeName;
    const limit = req.query.limit;
    const condition = storeName ? {storeName: {$regex: new RegExp(storeName), $options: "i"}} : {};
    Store.find(condition).limit(Number(limit))
        .then(data => {
           return  res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;
    Store.findById(id)
        .then(data => {
            if (!data)
              return res.status(404).send({message: "Not found Book with id " + id});
            else return res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send(err.message);
        });
};

exports.updateById = (req, res) => {
    if (!req.body.storeName || !req.body.id) {
        return res.status(400).send({
            message: "required parameter not found"
        });
    }

    const id = req.body.id;

    Store.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
               return res.status(400).send({
                    message: `Cannot update Store with id=${id}. Maybe Store was not found!`
                });
            } else return res.send({message: 'Store Update Succesfully'});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Store.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
               return res.status(400).send({
                    message: `Cannot delete Store with id=${id}. Maybe Store was not found!`
                });
            } else {
              return res.send({
                    message: "Store was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.deleteAll = (req, res) => {
    Store.deleteMany({})
        .then(data => {
           return  res.send({
                message: `${data.deletedCount} Books were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
};
