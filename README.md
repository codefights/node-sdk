CodeFights SDK for NodeJS

Instalation:
``
npm install codefights.net [-g]
``

Sample bot:
```javascript
var CodeFights = require('codefights.net');
var Area = CodeFights.Area;
var Move = CodeFights.Move;
var SDK = CodeFights.SDK;

function MyFighter() {

  this.makeNextMove = function(opponentsLastMove, myLastScore, opponentsLastScore) {
    // Do stuff here
    var move = new Move();

    move.addAttack(Area.NOSE)
        .addAttack(Area.JAW)
        .addBlock(Area.NOSE);

    return move;
  };
}

module.exports = MyFighter;

// Do not delete these lines
var sdk = new SDK(MyFighter);
sdk.run(process.argv);
```

To manually fight your bot: ``node MyFighter.js --fight-me``

To fight boxer bot: ``node MyFighter.js --fight-bot boxer``

To fight kickboxer bot: ``node MyFighter.js --fight-bot kickboxer``
