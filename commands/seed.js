var fs = require('fs');
var ejs = require('ejs');
var root = __dirname + '/../';


module.exports.create = (name) => {
    if (!name) return console.red('You must specify the model for this migration');
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
    if (!name) return console.red('soon');

};
