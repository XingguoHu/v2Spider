function getArticleList($, queryNode){
    let list = [];
    $(queryNode).each(function (index) {
        const $title = $(this).find('.item_title a');
        const $node = $(this).find('.node');
        const $user = $($(this).find('strong a')[0]);
        const $lastReply = $($(this).find('strong a')[1]);
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
            lastReply: {
                name: $lastReply.text(),
                link: $lastReply.attr('href'),
                time: $strongNext ? $strongNext.data.replace(/\s*/g, '').split('•')[1] : ''
            },
            replyNumber: parseInt($(this).find('tr').children().last().find('a').text() || 0)
        };
        list.push(article);
    });
    return list;
}

module.exports = {
    getArticleList
}