const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        storeName: {type:String,required:true}
    }, {timestamps: true})
    .method("toJSON", function () {
   // eslint-disable-next-line new-cap
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Store', schema);
