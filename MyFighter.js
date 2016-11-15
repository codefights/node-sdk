var CodeFights = require('./index');
var Area = CodeFights.Area;
var Move = CodeFights.Move;
var SDK = CodeFights.SDK;

function MyFighter() {

  this.makeNextMove = function(opponentsLastMove, myLastScore, opponentsLastScore) {
    // Do stuff here
	if (opponentsLastMove == null) {
		var move = new Move();
		move.addAttack(Area.NOSE);
		return move;
	}
	return opponentsLastMove;
  };
}

module.exports = MyFighter;

// Do not delete these lines
var sdk = new SDK(MyFighter);
sdk.run(process.argv);