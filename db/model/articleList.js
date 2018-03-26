const mongoose = require('mongoose');

const articleScheme = mongoose.Schema({
    avatar: String,
    title: String,
    link: String,
    node: {
        text: String,
        link: String
    },
    user: {
        link: String,
        name: String
    },
    lastReplay: {
        name: String,
        link: String,
        time: String
    },
    replayNumber: Number
});

const Article = mongoose.model('article', articleScheme);


module.exports = {
    async create(aricleList){
        for (let aticle of aricleList) {
            let articleModel = await Article.findOne({ title: aticle.title });
            if (!articleModel) {
                articleModel = new Article(aticle);
                await articleModel.save();
            }
        } 
    }
}