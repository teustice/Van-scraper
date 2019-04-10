var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){

  let paths = []

  app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      paths.push(`<a href=${r.route.path}><h3>${r.route.path}</h3></a>`);
    }
  })

  res.send(paths.join(' <br />'));

})

app.get('/hiace', function(req, res){

    url = 'https://portland.craigslist.org/search/cta?query=toyota+hiace&sort=rel';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {
              vans: []
            };

            // We'll use the unique header class as a starting point.

            $('.result-row').each(function(index, van){
                let vanData = {
                  title: $(van).find('.result-title').text(),
                  date: $(van).find('.result-date').attr('datetime'),
                  link: $(van).find('.result-title').attr('href')
                }

                json.vans.push(vanData);
            })

            res.json(json)

        } else {
          res.json('ERROR')
        }
    })

})

app.get('/townace', function(req, res){

    url = 'https://portland.craigslist.org/search/cta?query=toyota+townace&sort=rel';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {
              vans: []
            };

            // We'll use the unique header class as a starting point.

            $('.result-row').each(function(index, van){

                let vanData = {
                  title: $(van).find('.result-title').text(),
                  date: $(van).find('.result-date').attr('datetime'),
                  link: $(van).find('.result-title').attr('href')
                }

                json.vans.push(vanData);
            })

            res.json(json)

        } else {
          res.json('ERROR')
        }
    })

})

app.get('/liteace', function(req, res){

    url = 'https://portland.craigslist.org/search/cta?query=toyota+liteace&sort=rel';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {
              vans: []
            };

            // We'll use the unique header class as a starting point.

            $('.result-row').each(function(index, van){

                let vanData = {
                  title: $(van).find('.result-title').text(),
                  date: $(van).find('.result-date').attr('datetime'),
                  link: $(van).find('.result-title').attr('href')
                }

                json.vans.push(vanData);
            })

            res.json(json)

        } else {
          res.json('ERROR')
        }
    })

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
