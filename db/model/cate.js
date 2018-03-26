const mongoose = require('mongoose');

const CateSchema = new mongoose.Schema({
    name: String,
    value: String,
    fCate: String,
    type: String
});

const cateMoel = mongoose.model('cate', CateSchema);

module.exports = {
    async create(cateList, type = 'tab'){
        for (let cate of cateList){
            let Cate = await cateMoel.findOne({value: cate.value, type});
            if (!Cate){
                cate.type = type;
                Cate = new cateMoel(cate);
                await Cate.save();
            }
        } 
    }
}