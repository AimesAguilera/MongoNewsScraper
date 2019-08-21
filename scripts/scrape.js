
var axios = require('axios');
var cheerio = require('cheerio');


var scrape = function () {

    return axios.get('http://www.nytimes.com').then(function (res) {

        var $ = cheerio.load(res.data);
        console.log('scraping...');

        var articles = [];

        $('.css-8atqhb').each(function (i, element) {

            var head = $(element).find('h2').text().trim();
            var url = $(element).find('a').attr('href');
            var summary = $(element).find('ul').text().trim();

            if (head && summary && url) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ').trim();
                var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ').trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: summaryNeat,
                    url: 'https://www.nytimes.com' + url
                };
                articles.push(dataToAdd);
            }
        })


        return articles;
    });
};


module.exports = scrape;