var fs = require('fs');
var ejs = require('ejs');
var root = __dirname + '/../';


module.exports.create = (name) => {
    if (!name) return console.red('Name seed is not defined');
    name = name.pascal();
    let models = fs.readdirSync('./db/models');

    // make sure this model exists
    let modelInd = models.indexOf(name + '.js');
    if (modelInd === -1)
        return console.red('You have yet to create a model: ' + name);

    console.cyan('Creating a migration file for: ' + name);
    let file = ejs.render(fs.readFileSync(root + 'templates/seed.ejs', 'utf-8'), {name});

    fs.writeFileSync(`db/seeders/${name}-${Date.now()}.js`, file);
    console.green(`Migration for ${name} was successfully created!`);
};

module.exports.run = (name) => {
    if (!name) return console.red('Name seed is not defined');
    if (name !== 'all') return console.red('Soon run once seed');

    let names = fs.readdirSync('./db/seeders');

    for (let index in names) {
        if (names.hasOwnProperty(index)) {
            if (!names[index].match(/\.js$/)) break;
            let seedfn = require('./db/seeders/' + names[index]);
            if (seedfn && seedfn.up && typeof seedfn.up === 'function') {
                console.log('Seed start up'+names[index]+'...');
                seedfn.up().then(el => {
                    console.log('Seed success up: ' + names[index])
                })
            }
        }
    }

};

module.exports.undo = (name) => {
    if (!name) return console.red('You must specify the model for this migration');
    if (name !== 'all') return console.red('Soon run once seed');
    let names = fs.readdirSync('./db/seeders');

    for (let index in names) {
        if (names.hasOwnProperty(index)) {
            if (!names[index].match(/\.js$/)) break;
            let seedfn = require('./db/seeders/' + names[index]);
            if (seedfn && seedfn.down && typeof seedfn.down === 'function') {
                console.log('Seed start down'+names[index]+'...');
                seedfn.down().then(el => {
                    console.log('Seed success down: ' + names[index])
                })
            }
        }
    }
};
