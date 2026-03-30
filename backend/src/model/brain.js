const brain = require("brain.js");

const net = new brain.NeuralNetwork();

net.train([
  { input: [1, 1, 1, 1], output: { recommend: 1 } },
  { input: [0, 0, 0, 0], output: { recommend: 0 } },
]);

module.exports = net;
