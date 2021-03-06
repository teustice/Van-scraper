var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const scrapeCl = (url, callback) => {
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = {
        vans: []
      };

      $('.result-row').each(function(index, van) {

        let imageData = $(van).find('.result-image').attr('data-ids').split(':')
        totalImageCount = imageData.unshift();

        //Parse the image id's from the CL gallery
        imageData.forEach(function(id, i) {
          let idArray = id.split(',');
          idArray = idArray.slice(0, 1)
          imageData[i] = idArray[0]
        })

        imageData = imageData.slice(1, imageData.length) //remove leading 1

        //Known supported resolutions are:
        //300x300
        //600x450
        let images = imageData.map(function(id) {
          return (
            `https://images.craigslist.org/${id}_600x450.jpg`
          )
        })

        let vanData = {
          title: $(van).find('.result-title').text(),
          price: $(van).find('.result-meta .result-price').text(),
          date: $(van).find('.result-date').attr('datetime'),
          link: $(van).find('.result-title').attr('href'),
          imageCount: totalImageCount,
          images: images
        }

        json.vans.push(vanData);
      })

      callback && callback(json)

    } else {
      callback && callback('error')
    }
  })
}

app.get('/', function(req, res) {

  let paths = []

  app._router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
      paths.push(`<a href=${r.route.path}><h3>${r.route.path}</h3></a>`);
    }
  })

  res.send(paths.join(' <br />'));

})

app.get('/hiace', function(req, res) {
  url = 'https://portland.craigslist.org/search/cta?query=toyota+hiace&sort=rel';
  scrapeCl(url, function(json) {
    res.json(json)
  })
})

app.get('/townace', function(req, res) {
  url = 'https://portland.craigslist.org/search/cta?query=toyota+townace&sort=rel';
  scrapeCl(url, function(json) {
    res.json(json)
  })
})

app.get('/liteace', function(req, res) {
  url = 'https://portland.craigslist.org/search/cta?query=toyota+liteace&sort=rel';
  scrapeCl(url, function(json) {
    res.json(json)
  })
})

app.get('/delica', function(req, res) {
  url = 'https://portland.craigslist.org/search/cta?query=mitsubishi+delica&sort=rel';
  scrapeCl(url, function(json) {
    res.json(json)
  })
})

app.listen('8081')
console.log('Ready to rumble on port 8081');
exports = module.exports = app;
