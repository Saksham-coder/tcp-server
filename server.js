const net = require('net')
const { getHTML, getNews } = require("./helpers/scraper");

const server = net.createServer(conn => {

    conn.on('data',async data => {
        const html = await getHTML(JSON.parse(data).url);
        const news = await getNews(html);
        conn.write(news + '\r\n')
    })

    conn.on('end', ()=> {
        console.log("CONNECTION ENDED")
    })

})

const PORT = process.env.PORT || 9000

server.listen(PORT)