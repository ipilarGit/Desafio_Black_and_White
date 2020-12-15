const Jimp = require('jimp');
const http = require('http');
const url = require('url');
const fs = require('fs');
let i = 0;
http
    .createServer((req, res) => {
        const params = url.parse(req.url, true).query;

        if (req.url == "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            fs.readFile("index.html", "utf8", (err, html) => {
                res.end(html);
            });
        };

        if (req.url.startsWith("/imagen")) {
            const urlimagen = params.urlimagen;
            let newImagen = "newImg";
            console.log('urlimagen', urlimagen);
            Jimp.read(urlimagen, (err, img) => {
                img
                    .resize(350, Jimp.AUTO)
                    .quality(60)
                    .grayscale()
                    .writeAsync(`./img_procesadas/${newImagen}${i}.jpeg`)
                    .then(() => {
                        fs.readFile(`./img_procesadas/${newImagen}${i}.jpeg`, (err, imagen) => {
                            res.writeHead(200, { "Content-Type": "image/jpeg" });
                            res.write(`<div width="600px"><img src="${imagen}"/></div>`);
                            res.end(imagen);
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
            i++;
        }

        if (req.url == "/bootstrap") {
            res.writeHead(200, { "Content-Type": "text/css" });
            fs.readFile("./node_modules/bootstrap/dist/css/bootstrap.css", "utf8", (err, data) => {
                res.end(data);
            });
        };

        if (req.url == "/estilos") {
            res.writeHead(200, { "Content-Type": "text/css" }); //importar
            fs.readFile("estilos.css", "utf8", (err, css) => {
                res.end(css);
            })
        };
    })
    .listen(3000, () => console.log('Server on'))