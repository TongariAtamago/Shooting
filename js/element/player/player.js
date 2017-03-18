//sh.playerを定義
phina.define('sh.player', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function() {
    this.superInit(4);
    this.speed = null;//スピード
    this.rotationSpeed = null;//回転スピード
    this.bulletAngle = null;//弾の角度
    this.imageIndex = null;
    //ポジション
    this.setPosition(SC_W/2,SC_H/2);
    //TODO 当たり判定 弾側でやるかも。
    //画像
    image = Sprite('player_image',64,64).addChildTo(this);
    image.frameIndex = this.imageIndex;
  },
  //アップデート時の処理
  update: function(app) {
    var key = app.keyboard;
    if (key.getKey('c')) {
      //レーザー　TODO
      //回転
      if (key.getKey('x')) { this.rotation += this.rotationSpeed / 4; }//右回転
      if (key.getKey('z')) { this.rotation -= this.rotationSpeed / 4; }//左回転
      // 移動
      if (this.x - 44 >= 0) {if (key.getKey('left')) { this.x -= this.speed / 3; }}//左
      if (SC_W >= this.x + 44) {if (key.getKey('right')) { this.x += this.speed / 3; }}//右
      if (this.y - 44 >= 0) {if (key.getKey('up')) { this.y -= this.speed / 3; }}//上
      if (SC_H >= this.y + 44) {if (key.getKey('down')) { this.y += this.speed / 3; }}//下
    }else{
      //回転
      if (key.getKey('x')) { this.rotation += this.rotationSpeed; }//右回転
      if (key.getKey('z')) { this.rotation -= this.rotationSpeed; }//左回転
      // 移動
      if (this.x - 44 >= 0) {if (key.getKey('left')) { this.x -= this.speed; }}//左
      if (SC_W >= this.x + 44) {if (key.getKey('right')) { this.x += this.speed; }}//右
      if (this.y - 44 >= 0) {if (key.getKey('up')) { this.y -= this.speed; }}//上
      if (SC_H >= this.y + 44) {if (key.getKey('down')) { this.y += this.speed; }}//下
      //弾の発射
      if (app.frame % 5 === 0) {
        (this.bulletAngle / 20 + 1).times(function(i){
          var bullet = sh.playerBullet(-20 * this.bulletAngle / 20 / 2 + (20 * i)).addChildTo(this.parent);
        },this);
      }
    }

  }
});
