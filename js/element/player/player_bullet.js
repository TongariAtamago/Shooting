phina.define('PLAYER_BULLET', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function() {
    this.superInit(4);
    //ポジション
    this.setPosition(player.x,player.y)
    //TODO 当たり判定 プレイヤー側でやるかも

    var circlek = CircleShape().addChildTo(this);

  },
  update: function() {
    this.x += ((player.rotation - 30) * Math.RAD_TO_DEG).sin() * 10;
    this.y += ((player.rotation - 30) * Math.RAD_TO_DEG).cos() * 10;
  },
});
