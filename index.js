const koa = require('koa');
const app = new koa();
const spider = require('./spider');


app.use(async ctx => {
    res = await spider();
    ctx.body = res;
});

app.listen(3000);
