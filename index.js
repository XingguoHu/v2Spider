const koa = require('koa');
const app = new koa();
const spider = require('./spider');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();


myEmitter.on('error', (err) => {
    console.error('whoops! there was an error----------------------------------------------');
});

app.use(async ctx => {
    try{
        myEmitter.emit('error', new Error('whoops!'));
    }
    catch(e){
       
    }
    ctx.body = {};
});

// app.on('error', err => {
//     console.error('server error', err)
// });


app.listen(3000);
