var Area = require('./Area');

function GameScoringRules() {
  this.NOSE_SCORE = 10;
  this.JAW_SCORE = 8;
  this.BELLY_SCORE = 6;
  this.GROIN_SCORE = 4;  
  this.LEGS_SCORE = 3;

  this.LIFEPOINTS = 150;
}

GameScoringRules.prototype.calculateScore = function(attacks, blocks) {
  var rez = 0,
      i;

  if(attacks) {
    for(i = 0; i < attacks.length; i++) {
      if(blocks.indexOf(attacks[i]) !== -1) {
        continue;
      }

      rez = rez + this.getAttackSeverity(attacks[i]);
    }
  }

  return rez;
};

GameScoringRules.prototype.getAttackSeverity = function(attack) {
  if(attack === Area.NOSE) {
    return this.NOSE_SCORE;
  }

  if(attack === Area.JAW) {
    return this.JAW_SCORE;
  }

  if(attack === Area.GROIN) {
    return this.GROIN_SCORE;
  }

  if(attack === Area.BELLY) {
    return this.BELLY_SCORE;
  }

  if(attack === Area.LEGS) {
    return this.LEGS_SCORE;
  }

  throw 'Unknown attack vector: ' + attack;
};

GameScoringRules.prototype.isMoveLegal = function(move) {
  var attacks = move.getAttacks(),
      blocks = move.getBlocks();

  return attacks.length + blocks.length <= 3;
};

module.exports = new GameScoringRules();