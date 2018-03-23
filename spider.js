const rp = require('request-promise');
const cheerio = require('cheerio');
const tab = require('./tab');
const subCate = require('./sub_cate');



async function loadHtml(url) {
    let  res =  await rp(url);
    return res;
}

module.exports = async function () {
    const url = 'https://www.v2ex.com/go/gap';
    let $ = cheerio.load(await loadHtml(url));
   // return subCate.getArticleList($);
    subCate.getTotalPage($)
    // let $ = cheerio.load(await loadHtml(url));
    // const tabList = tab.getTabList($);
    // const articleList = [];
    // tab.getCateList($);        
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