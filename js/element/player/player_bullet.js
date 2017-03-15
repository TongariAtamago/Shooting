phina.define('PLAYER_BULLET', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function(rotate) {
    this.superInit(4);
    //ポジション
    this.setPosition(player.x,player.y)
    //回転
    this.rotation = rotate + player.rotation;
    //TODO 当たり判定 プレイヤー側でやるかも
    //とりあえず見た目の図形
    var circle = CircleShape({radius: 20,}).addChildTo(this);//コンビニじゃないよ！
    var rect = RectangleShape({width:40,height:35}).addChildTo(this);

    var v = Vector2().fromDegree(player.rotation - 90 + rotate, 30);
    this.physical.velocity = v;

  },
  //アップデート処理
  update: function() {
    if (this.x <= -20 || this.x >= SC_W + 20 ||
    this.y <= -20 || this.y >= SC_H + 20) {this.remove()}
  }
});
