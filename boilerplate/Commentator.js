var GameScoringRules = require('../model/GameScoringRules'),
    Protocol = require('./server/Protocol');

function Commentator() {
  this.fighter1 = 'Fighter 1';
  this.fighter2 = 'Fighter 2';

  this.lp1 = GameScoringRules.LIFEPOINTS;
  this.lp2 = GameScoringRules.LIFEPOINTS;
}

Commentator.prototype.setFighterNames = function(fighter1name, fighter2name) {
  this.fighter1 = fighter1name;
  this.fighter2 = fighter2name;
};

Commentator.prototype.describeRound = function(move1, move2, score1, score2) {
  this.describeMove(this.fighter1, move1, score1, move2);
  this.describeMove(this.fighter2, move2, score2, move1);

  this.lp1 -= score2;
  this.lp2 -= score1;

  console.log(this.fighter1 + ' vs ' + this.fighter2 + ': ' + this.lp1 + ' to ' + this.lp2 + '\n');
};

Commentator.prototype.gameOver = function(f1Lifepoints, f2Lifepoints) {
  console.log('FIGHT OVER');

  if(f1Lifepoints > f2Lifepoints) {
    console.log('THE WINNER IS ' + this.fighter1);
  } else if(f2Lifepoints > f1Lifepoints) {
    console.log('THE WINNER IS ' + this.fighter2);
  } else {
    console.log('IT\'S A DRAW!!!');
  }

};

Commentator.prototype.describeMove = function(fighterName, move, score, counterMove) {
  console.log(fighterName +
              this.describeAttacks(move, counterMove, score) +
              this.describeDefences(move) +
              this.describeComment(move));
};

Commentator.prototype.describeAttacks = function(move, counterMove, score) {
  var attacks = move.getAttacks(),
      rez, i;

  if(attacks.length <= 0) {
    return ' did NOT attack at all ';
  }

  rez = ' attacked ';

  for(i = 0; i < attacks.length; i++) {
    rez = rez + attacks[i];

    if(counterMove.getBlocks().indexOf(attacks[i]) === -1) {
      rez = rez + '(+), ';
    } else {
      rez = rez + '(-), ';
    }

  }
  return rez + ' scoring ' + score;
};

Commentator.prototype.describeDefences = function(move) {
  var blocks = move.getBlocks(),
      rez, i;

  if(blocks.length <= 0) {
    return ' and was NOT defending at all.';
  }

  rez = ' while defending ';
  for(i = 0; i < blocks.length; i++) {
    rez = rez + blocks[i] + ', ';
  }

  return rez;
};

Commentator.prototype.describeComment = function(move) {
  var comment = move.getComment(),
      proto = new Protocol();

  if(comment) {
    return ' Also said "' + proto.sanitizeComment(comment) + '"';
  }
  return '';
};

module.exports = Commentator;