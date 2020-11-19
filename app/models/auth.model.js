const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    email:{type:String,required:true,unique:true,index: true},
    name:{type:String,required:true,unique:true},
    password:{type:String,required: true},
},{timestamps: true})
.method("toJSON", function () {
    // eslint-disable-next-line no-alert
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('User',schema);
