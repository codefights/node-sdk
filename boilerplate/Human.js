var readline = require('readline-sync').question,
    Protocol = require('./server/Protocol'),
    ProtocolException = require('./ProtocolException'),
    GameScoringRules = require('../model/GameScoringRules');

function Human() {}

Human.prototype.makeNextMove = function(oppMove, iScored, oppScored) {

  try {
    this.input = readline('Make your move by (A)ttacking and (B)locking (N)ose, (J)aw, (B)elly, (G)roin, (L)egs (for example, BN BB AN): ');
  } catch(Error) {
    console.log('Human error');
  }

  return this.parseInput(this.input);

};

Human.prototype.parseInput = function(strin) {
  var input = strin.replace(/ /g, '').toLocaleLowerCase(),
      prot = new Protocol(),
      move;

  if (this.startsWith(input, 'q'))
    throw new ProtocolException('Exiting');

  move = prot.parseMove(input);
  if (!GameScoringRules.isMoveLegal(move)) {
    throw new ProtocolException('Can make max 3 things at a time!');
  }

  return move;
};

Human.prototype.startsWith = function(haystack, needle) {
  return haystack.substring(0, 1) === needle;
};

module.exports = Human;