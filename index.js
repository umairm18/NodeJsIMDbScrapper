const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://www.imdb.com/chart/top/'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/data', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.titleColumn', html).each(function () { //<-- cannot be a function expression
                const title = $(this).text()
                const url = $(this).find('a').attr('href')
                const imgs = $(this).find('img').attr('src')

                //downloading images

                /*({
                    images: [
                        {
                            uri:imgs
                        }
                    ],
                    dest:'./downloads'
                })
                .then((info) => {
                    console.log("Download Completed")
                })*/

                articles.push({
                    title,
                    url,
                    imgs
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))