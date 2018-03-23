const spider_func = require('./common/spider_func');

function getArticleList($){
    return spider_func.getArticleList($, '#TopicsNode div.cell');
}

function getTotalPage($){
    $cell = $('#Main .box > .cell');
    if($cell && $cell.length > 1){
        return $($cell[0]).find('td a').last().text()
    }else{
       return 1
    }
}

module.exports = {
    getArticleList,
    getTotalPage
};

