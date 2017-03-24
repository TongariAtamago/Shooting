//sh.playerを定義
phina.define('sh.player', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  /**
  * 0:赤
  * 1:緑
  * 2:青
  * 3:ピンク
  */
  type: null,
  /*
  * 0:ショット
  * 1:レーザー
  * 2:エキスパート
  * 3:ビギナー
  */
  style: null,
  //無敵
  muteki: false,
  //当たり判定のある場所
  hitCircle: null,
  //ハイパーのときのゲージ
  hyperCircle: null,
  //画像
  image: null,
  //初期化
  init: function(type,style) {
    this.superInit(4);
    this.type = type;//type
    this.style = style;//style
    //                      赤   緑   青  ピンク
    this.speed         =  [  6.0,  5.0,  4.5,  5.5][type];//スピード
    this.rotationSpeed =  [  2.5,  2.0,  3.0,  2.0][type];//回転スピード
    this.bulletAngle   =  [   60,   80,   40,   60][type];//弾の角度
    this.bulletAngle_1 =  [   80,  100,   60,   80][type];//hlv1 の弾角度
    this.bulletAngle_2 =  [  100,  120,   80,  100][type];//hlv2 の弾角度
    this.bulletAngle_3 =  [  120,  140,   80,  120][type];//hlv3 の弾角度
    this.bulletAngle_4 =  [  140,  160,  100,  140][type];//hlv4 の弾角度
    this.bulletAngle_5 =  [  140,  160,  100,  140][type];//hlv5 の弾角度
    this.bulletAngle_6 =  [  140,  180,  120,  160][type];//hlv6 の弾角度
    this.bulletAngle_7 =  [  160,  180,  140,  160][type];//hlv7 の弾角度
    this.bulletAngle_8 =  [  160,  200,  140,  180][type];//hlv8 の弾角度
    this.bulletAngle_9 =  [  180,  220,  160,  180][type];//hlv9 の弾角度
    this.bulletAngle_10=  [  200,  240,  180,  200][type];//hlv10の弾角度
    this.animTop       =  ['p0_0'][type];//通常
    this.animLeft      =  ['p0_1'][type];//左
    this.animRight     =  ['p0_2'][type];//右
    this.animUp        =  ['p0_3'][type];//上
    this.animDown      =  ['p0_4'][type];//下
    this.animUpLeft    =  ['p0_5'][type];//左上
    this.animUpRight   =  ['p0_6'][type];//右上
    this.animDownLeft  =  ['p0_7'][type];//左下
    this.animDownRight =  ['p0_8'][type];//右下
    //ポジション
    this.setPosition(SC_W/2,SC_H/2);
    //画像
    this.image = Sprite('player_image',64,64).addChildTo(this);
    var player_ss = FrameAnimation ('player_ss');
    player_ss.attachTo(this.image);
    player_ss.gotoAndPlay(this.animTop);
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
