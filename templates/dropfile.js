const mongoose = require('mongoose');

// require all models in the 'models' directory
const models = require('../index.js');


const args = process.argv.slice(2);
let state = { count: 0 };
if (!args.length) {
  state.total = Object.keys(models).length;
  for (let name in models) {
    models[name].remove({}, () => {
      state.count++;
    });
  }
} else {
  state.total = args.length;
  args.forEach(name => {
    models[name].remove({}, () => {
      state.count++;
    });
  });
}


checkIfDone();
function checkIfDone() {
  if (state.total === state.count) {
    console.log("Drop complete!");
    return mongoose.connection.close();
  }
  setTimeout(checkIfDone, 500);
}