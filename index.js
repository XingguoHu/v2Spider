const rp = require('request-promise');
const cheerio = require('cheerio');


async function getHtml(url) {
    let  res =  await rp(url);
    return res;
}

function getCategories($) {
    $('#Main .box .inner  a').filter((i, e) =>{
        console.log($(e).attr('class'));
        return ($(e).attr('class') || '').includes('tab')
    }).each(((i, e) =>{
        console.log($(e).text());
    }));
}

function getArticleList($) {
    $('#Main .box .cell.item').each(function (index) {
        let $title = $(this).find('.item_title a');
        let $node = $(this).find('.node');
        let $user = $($(this).find('strong a')[0]);
        let $lastReplay = $($(this).find('strong a')[1]);
        let $strongNext = $(this).find('.small.fade strong')[0].next;
        let article = {
            avatar: $(this).find('img').attr('class','avatar').attr('src'),
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
            lastReplay:{
                name: $lastReplay.text(),
                link: $lastReplay.attr('href'),
                time: $strongNext ? $strongNext.data.replace(/\s*/g, '').split('•')[1] : ''
            },
            replayNumber: parseInt($(this).find('tr').children().last().find('a').text() || 0)
        };

        console.log(article);
    })
}


(async function () {

    const $ = cheerio.load(await getHtml('https://www.v2ex.com/?tab=tech'), {

    });
 //   getCategories($);
    getArticleList($);
})();



getHtml('https://www.v2ex.com/?tab=tech');