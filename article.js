function getArticleContent($){
    const $headerGray = $('.header > .gray');
    const pub = $headerGray.last().text().split(' · ');
    const articleContent = {
        title: $('.header > h1').text(),
        puber: pub[0],
        pubTime: pub[1],
        click: pub[2],
        lastReplyTime: $('#Main .box > .cell > .gray > .snow')[0].next.data.split('直到')[1],
        topicContent: JSON.stringify($('.topic_content .markdown_body').html()),
        reply: []
    };
    $($('#Main .box')[1]).children().each(function(index){
        if(index !== 0){
            const $td = $(this).find('tr > td');
            articleContent.reply.push({
                avatar: $($td[0]).find('img').attr('src'),
                userName: $($td[2]).find('a.dark').text(),
                time: $($td[2]).find('span.ago').text(),
                replyContent: $($td[2]).find('div.reply_content').text(),
            });
        }
    });
    return articleContent
};

module.exports = {
    getArticleContent
};




