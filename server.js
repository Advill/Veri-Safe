const http = require('http');
const request = require('request');
const fs = require('fs');

function writeTable(res, data) {
    for (i = 0; i < data.id.length; i++) {
        res.write('<tr>\n<td>' + data.id[i] + '</td>\n<td>' + 
            data.plate_text[i] + '</td>\n<td>' + data.time_stamp[i] + '</td>\n</tr>')
    }
}
let one;
let two;
let three;
fs.readFile('src/first.html', (err, data) => {
    if(err) throw err;
    one = data;
});
fs.readFile('src/second.html', (err, data) => {
    if(err) throw err;
    two = data;
});
fs.readFile('src/third.html', (err, data) => {
    if(err) throw err;
    three = data;
});
let othertable;
let alltable;

request({
    url:'http://localhost:8082/ALL-LP',
    json:true
}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
        alltable = body;
    }
    else {
        console.log(response.statusCode);
    }
});

request({
    url:'http://localhost:8082/Other-LP',
    json:true
}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
        othertable = body;
    }
    else {
        console.log(response.statusCode);
    }
});

function func (res) {
    res.write(one);
    writeTable(res, othertable);
    res.write(two);
    writeTable(res, alltable);
    res.write(three);
    res.end();
}

http.createServer(function (req, res) {
    func(res);
}).listen(8080);
console.log('listening on port 8080');

