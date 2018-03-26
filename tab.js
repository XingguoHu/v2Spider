const spider_func = require('./common/spider_func');

function getCateList($) {
    let cateList = [];
    $('#Main').children().last().children().filter(function(index){
        return (index !== 0) && ($(this).attr('class') !== 'inner');
    }).each(function(index){
        let $this = $(this);
        let fCate = $this.find('span.fade').text();
        $this.find('a').each(function(){
            let $this = $(this);
            cateList.push({
                name: $this.text(),
                value: $this.attr('href').split('/')[2],
                fCate
            });
        });
    });
    return cateList;
}

function getArticleList($) { 
    return spider_func.getArticleList($, '#Main .box .cell.item');
}

function getTabList($){
    const tabList = [];
    $('#Tabs a').each(function(index){
        const $this = $(this);
        const tab = {
            value: $this.attr('href').split('=')[1],
            name: $this.text(),
        }
        tabList.push(tab);
    })
    return tabList;
}

module.exports = {
    getArticleList,
    getCateList,
    getTabList,
};