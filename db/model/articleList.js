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
    lastReply: {
        name: String,
        link: String,
        time: String
    },
    replyNumber: Number,
    type: '',
    cate: ''
});

const ArticleModel = mongoose.model('article', articleScheme);


module.exports = {
    async create(aricleList, cate, type){
        for (let article of aricleList) {
            let Article = await ArticleModel.findOne({ title: article.title });
            if (!Article) {
                article.type = type;
                article.cate = cate;
                Article = new ArticleModel(article);
                await Article.save();
            }
        } 
    }
}