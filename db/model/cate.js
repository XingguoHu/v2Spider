const mongoose = require('mongoose');

const CateSchema = new mongoose.Schema({
    name: String,
    value: String,
    fCate: String,
    type: String
});

const Cate = mongoose.model('Cate', CateSchema);

module.exports = {
    async create(cateList, type = 'tab'){
        for (let cate of cateList){
            let cateModel = await Cate.findOne({value: cate.value, type});
            if (!cateModel){
                cate.type = type;
                cateModel = new Cate(cate);
                await cateModel.save();
            }
        } 
    }
}