function getCateList($) {
    let cateList = [];
    $('#Main').children().last().children().filter(function(index){
        return (index !== 0) && ($(this).attr('class') !== 'inner');
    }).each(function(index){
        let $this = $(this);
        const cateItem = {
            name: $this.find('span.fade').text(),
            subCateList: [],
        };
        $this.find('a').each(function(){
            let $this = $(this);
            cateItem.subCateList.push({
                name: $this.text(),
                value: $this.attr('href').split('/')[2]
            });
        });
        cateList.push(cateItem);
    });
    return cateList;
}

function getArticleList($) { 
    let list = [];
    $('#Main .box .cell.item').each(function (index) {
        const $title = $(this).find('.item_title a');
        const $node = $(this).find('.node');
        const $user = $($(this).find('strong a')[0]);
        const $lastReplay = $($(this).find('strong a')[1]);
        const $strongNext = $(this).find('.small.fade strong')[0].next;
        const article = {
            avatar: $(this).find('img').attr('class', 'avatar').attr('src'),
            title: $title.text(),
            link: $title.attr('href'),
            node: {
                text: $node.text(),
                link: $node.attr('href')
            },
            user: {
                link: $user.attr('href'),
                name: $user.text()
            },
            lastReplay: {
                name: $lastReplay.text(),
                link: $lastReplay.attr('href'),
                time: $strongNext ? $strongNext.data.replace(/\s*/g, '').split('•')[1] : ''
            },
            replayNumber: parseInt($(this).find('tr').children().last().find('a').text() || 0)
        };
        list.push(article);
    });
    return list;
}

function getTabList($){
    const tabList = [];
    $('#Tabs a').each(function(index){
        const $this = $(this);
        const tab = {
            value: $this.attr('href').split('=')[1],
            name: $this.text()
        }
        tabList.push(tab);
    })
    return tabList;
}

module.exports = {
    getArticleList,
    getCateList,
    getTabList,
}