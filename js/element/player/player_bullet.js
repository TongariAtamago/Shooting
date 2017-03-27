//sh.playerBulletを定義
phina.define('sh.playerBullet', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function(rotate,type) {
    this.superInit(4);
    //ポジション
    this.setPosition(player.x,player.y);
    //回転
    this.rotation = rotate;
    //画像
    this.image = Sprite('player_image_bullet',64,64).addChildTo(this);
    this.spriteSheet = FrameAnimation ('player_bullet_ss');
    this.spriteSheet.attachTo(this.image);
    if (player.hyper){
      this.spriteSheet.gotoAndPlay('pb_hyper');
    } else {
      this.spriteSheet.gotoAndPlay(['pb_typeA','pb_typeB','pb_typeC','pb_typeD'][type]);
    }
    //移動
    var v = Vector2().fromDegree(player.rotation - 90 + rotate, 50);
    this.physical.velocity = v;
    this.visible = false;
    this.tweener
    .wait(8)
    .set({visible:true});

  },
  //アップデート処理
  update: function() {
    //画面外で消す
    if (this.x <= -20 || this.x >= SC_W + 20 ||
    this.y <= -20 || this.y >= SC_H + 20) {this.remove();}
  }
});
