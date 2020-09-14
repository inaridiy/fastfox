const sharp = require('sharp');
const image = sharp('/home/ubuntu/cms/fastfox/api/posts/img/osaka.jpeg');
image.toFile('new_smile.png')
    .then(info => {

        console.log(info);

    })
    .catch(error => {

        console.log(error);

    });