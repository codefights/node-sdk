var Commentator = require('./Commentator');
var ProtocolException = require('./ProtocolException');
var GameScoringRules = require('../model/GameScoringRules');

function Arena() {
  this.fighters = [];
  this.commentator = new Commentator();
}

Arena.prototype.registerFighter = function(fighter, name) {
  this.fighters.push({
      name: name,
      fighter: fighter
    });
  return this;
};

Arena.prototype.stageFight = function() {
  var f1name, fighter1, f1, f1Move = null, score1 = 0, f1Lifepoints = GameScoringRules.LIFEPOINTS, move1,
      f2name, fighter2, f2, f2Move = null, score2 = 0, f2Lifepoints = GameScoringRules.LIFEPOINTS, move2;
  if(this.fighters.length != 2) {
    throw new ProtocolException('Must be 2 fighters!');
  }

  f2 = this.fighters.pop();
  f1 = this.fighters.pop();

  f1name = f1.name;
  fighter1 = f1.fighter;

  f2name = f2.name;
  fighter2 = f2.fighter;

  this.commentator.setFighterNames(f1name, f2name);

  while(f1Lifepoints > 0 && f2Lifepoints > 0) {
    move1 = fighter1.makeNextMove(f2Move, score1, score2);
    move2 = fighter2.makeNextMove(f1Move, score2, score1);

    if (!GameScoringRules.isMoveLegal(move1)) {
      throw new ProtocolException('Fighter 1 made illegal move: max 3 things at a time!');
    }

    if (!GameScoringRules.isMoveLegal(move2)) {
      throw new ProtocolException('Fighter 2 made illegal move: max 3 things at a time!');
    }

    score1 = GameScoringRules.calculateScore(move1.getAttacks(),
      move2.getBlocks());

    score2 = GameScoringRules.calculateScore(move2.getAttacks(),
      move1.getBlocks());

    this.commentator.describeRound(move1, move2, score1, score2);

    f1Lifepoints -= score2;
    f2Lifepoints -= score1;

    f1Move = move1;
    f2Move = move2;
  }

  this.commentator.gameOver(f1Lifepoints, f2Lifepoints);

};

Arena.prototype.setCommentator = function(commentator) {
  this.commentator = commentator;
  return this;
};

module.exports = Arena;