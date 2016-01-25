module.exports = function(robot) {

    var request = require('request');
    var cheerio = require('cheerio');

    var url = 'https://status.bitbucket.com';

    robot.hear(/bitbucket/i, function(res) {

        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {

                var $ = cheerio.load(body);

                var status  = [
                    {'class': 'div.status-red span.name', 'desc': 'Major outage'},
                    {'class': 'div.status-orange span.name', 'desc': 'Partial outage'},
                    {'class': 'div.status-yellow span.name', 'desc': 'Degraded Performance'}
                ];

                status.forEach(function(val) {
                    $(val.class).each(function() {
                        res.send(val.desc + ': ' + '[http://status.bitbucket.org] - ' + $(this).text().replace('?', '').trim());
                    });
                });

            } else {
                res.send('Request to ' + url + ' did not create a 200 response :S');
            }
        });

    });

};
