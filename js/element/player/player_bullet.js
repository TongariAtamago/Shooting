//sh.playerBulletを定義
phina.define('sh.playerBullet', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function() {
    this.superInit(4);
    //ポジション
    this.setPosition(player.x,player.y);
    //回転
    this.rotation = player.rotation;
    //画像
    this.image = Sprite('player_image_accessory',64,64).addChildTo(this);
    switch (player.type) {
      case 0 :
        this.image.frameIndex = 0;
        break;
      case 1 :
        this.image.frameIndex = 1;
        break;
      case 2 :
        this.image.frameIndex = 2;
        break;
      case 3 :
        this.image.frameIndex = 3;
        break;
    }
    //移動
    var v = Vector2().fromDegree(player.rotation - 90, 60);
    this.physical.velocity = v;
    this.visible = true;
    this.tweener
    .wait(0.1)
    .set({visible:true});

  },
  //アップデート処理
  update: function() {
    //画面外で消す
    if (this.x <= -10 || this.x >= SC_W + 10 ||
    this.y <= -10 || this.y >= SC_H + 10) {this.remove();}
  }
});
