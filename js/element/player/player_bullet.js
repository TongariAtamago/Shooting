//sh.playerBulletを定義
phina.define('sh.playerBullet', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function(rotate) {
    this.superInit(4);
    //ポジション
    this.setPosition(player.x,player.y);
    //回転
    this.rotation = rotate;
    //画像
    var bulletImage = Sprite('player_image_bullet',64,64).addChildTo(this);
    bulletImage.frameIndex = 0;
    this.bulletImage = bulletImage;
    //移動
    var v = Vector2().fromDegree(player.rotation - 90 + rotate, 30);
    this.physical.velocity = v;
    this.visible = false;
    this.tweener
    .wait(10)
    .set({visible:true});

  },
  //アップデート処理
  update: function() {
    //画面外で消す
    if (this.x <= -20 || this.x >= SC_W + 20 ||
    this.y <= -20 || this.y >= SC_H + 20) {this.remove();}
    //フレームアニメーション
    if(this.bulletImage.frameIndex === 3) {
      this.bulletImage.frameIndex = 0;
    }else{
      this.bulletImage.frameIndex ++;
    }
  }
});
