phina.define('PLAYER_BULLET', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function() {
    this.superInit(4);
    //ポジション
    this.setPosition(player.x,player.y)
    //TODO 当たり判定 プレイヤー側でやるかも

    var circlek = CircleShape().addChildTo(this);//コンビニじゃないよ！

  },
  update: function() {
    this.setPosition(Vector2().fromDegree(100,10));
  },
});
