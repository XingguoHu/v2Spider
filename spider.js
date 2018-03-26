const rp = require('request-promise');
const cheerio = require('cheerio');
const tab = require('./tab');
const cate = require('./cate');
const mongoose = require('mongoose');
const con = mongoose.connection;
const CateModel = require('./db/model/cate');
const ArticleModel = require('./db/model/articleList');

mongoose.connect('mongodb://localhost/v2');


async function loadHtml(url) {
    const opt = {
        url,
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
    }
    let res = await rp(opt);
    return res;
}



async function run() {
    let baseUrl = 'https://www.v2ex.com/', $ = null, tabList = [], cateList = [];
    $ = cheerio.load(await loadHtml(baseUrl));
    tabList = tab.getTabList($);
    // await CateModel.create(tabList, 'tab');
    // cateList = tab.getCateList($);
    // await CateModel.create(cateList, 'subCate');
    
    
    //get tab page articlelist

    for(let {value} of tabList){
        url = `${baseUrl}?tab=${value}`;
        $ = cheerio.load(await loadHtml(url));
        let articleList = tab.getArticleList($);
        await ArticleModel.create(articleList);
    }


    //return cate.getArticleList($);
    //return cate.getTotalPage($)
    // let $ = cheerio.load(await loadHtml(url));
    // const tabList = tab.getTabList($);
    // const articleList = [];
          
    // for(let item of tabList){
    //     const subUrl = `${url}?tab=${item.value}`;
    //     $ = cheerio.load(await loadHtml(subUrl));
    //     articleList.push({
    //         tab: item.name,
    //         content: tab.getArticleList($)
    //     });
    // }
    // return articleList;
};

con.once('open', async _ => {
    //成功连接
    console.log('----------------mongo connect success----------------');
    console.log('----------------spider run----------------');
    await run();
    console.log('-----------------end-----------------');    
})








