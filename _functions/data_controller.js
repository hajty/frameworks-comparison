'use strict';

const fetch = require('node-fetch');
const perfy = require('perfy');

exports.load = async (count) => {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    let counter = count/100;
    let data = [];

    console.log(`Starting to get ${count} records from ${dataUrl}...`);
    perfy.start('data-get');

    while (counter <= count) {
        const result = await fetch(dataUrl);

        if (result.ok) {
            const posts = await result.json();

            for (let post of posts) data.push(post);

            counter += 100;
        }
        else throw Error(result.statusText);
    }

    if (count < 100) data = data.slice(0, count);

    console.log(`Data of ${data.length} records got in ${perfy.end('data-get').time} seconds.`);

    return data;
}