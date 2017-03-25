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
  //弾やレーザーのrotation
  vRotation: 0,
  //当たり判定のある場所
  hitCircle: null,
  //ハイパーのときのゲージ
  hyperCircle: null,
  //画像
  image: null,
  //スプライトシート
  spriteSheet: null,
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
    this.animTop       =  ['p0_0','p1_0','p2_0'][type];//通常
    this.animLeft      =  ['p0_1','p1_1','p2_1'][type];//左
    this.animRight     =  ['p0_2','p1_2','p2_2'][type];//右
    this.animUp        =  ['p0_3','p1_3','p2_3'][type];//上
    this.animDown      =  ['p0_4','p1_4','p2_4'][type];//下
    this.animUpLeft    =  ['p0_5','p1_5','p2_5'][type];//左上
    this.animUpRight   =  ['p0_6','p1_6','p2_6'][type];//右上
    this.animDownLeft  =  ['p0_7','p1_7','p2_7'][type];//左下
    this.animDownRight =  ['p0_8','p1_8','p2_8'][type];//右下
    //ポジション
    this.setPosition(SC_W/2,SC_H/2);
    //画像
    this.image = Sprite('player_image',64,64).addChildTo(this);
    this.spriteSheet = FrameAnimation ('player_ss');
    this.spriteSheet.attachTo(this.image);

  },
  //アップデート時の処理
  update: function(app) {
    var key = app.keyboard;//key取得
    var vSpeed = null;
    var vRotationSpeed = null;
    //Cキー
    if (key.getKey('C')) {
      vSpeed = this.speed / 4;
      vRotationSpeed = this.rotationSpeed / 4;
    } else {
      vSpeed = this.speed;
      vRotationSpeed = this.rotationSpeed;
      //弾の発射
      if (app.frame % 7 === 0) {
        (this.bulletAngle / 20 + 1).times(function(i){
          var bullet = sh.playerBullet(-20 * this.bulletAngle / 20 / 2 + (20 * i) + this.vRotation).addChildTo(this.parent);
        },this);
      }
    }
    //回転
    if (key.getKey('x')) { this.vRotation += vRotationSpeed; }//右回転
    if (key.getKey('z')) { this.vRotation -= vRotationSpeed; }//左回転
    // 移動
    if(this.y >= 32 && key.getKey('up') && this.x >= 32 && key.getKey('left')) {
      this.y -= vSpeed;
      this.x -= vSpeed;
      this.anim('upLeft');
    }else if(this.y >= 32 && key.getKey('up') && this.x && SC_W - 32 >= this.x && key.getKey('right')){
      this.y -= vSpeed;
      this.x += vSpeed;
      this.anim('upRight');
    }else if(SC_H - 32 >= this.y && key.getKey('down') && this.x >= 32 && key.getKey('left')){
      this.y += vSpeed;
      this.x -= vSpeed;
      this.anim('downLeft');
    }else if(SC_H - 32 >= this.y && key.getKey('down') && SC_W - 32 >= this.x && key.getKey('right')){
      this.y += vSpeed;
      this.x += vSpeed;
      this.anim('downRight');
    }else if(this.y >= 32 && key.getKey('up')) {
      this.y -= vSpeed;
      this.anim('up');
    }else if(SC_H - 32 >= this.y && key.getKey('down')) {
      this.y += vSpeed;
      this.anim('down');
    }else if(this.x >= 32 && key.getKey('left')) {
      this.x -= vSpeed;
      this.anim('left');
    }else if(SC_W - 32 >= this.x && key.getKey('right')) {
      this.x += vSpeed;
      this.anim('right');
    }else{
      this.anim('top');
    }
  },
  // アニメーション処理
  anim: function(string) {
    var nowAnim = 'top';
    var isNow = null;
    if(string === 'top'){
      isNow = nowAnim === 'top';
      nowAnim = 'top';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animTop);
      }
    }else if(string === 'up'){
      isNow = nowAnim === 'up';
      nowAnim = 'up';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animUp);
      }
    }else if(string === 'down'){
      isNow = nowAnim === 'down';
      nowAnim = 'down';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animDown);
      }
    }else if(string === 'left'){
      isNow = nowAnim === 'left';
      nowAnim = 'left';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animLeft);
      }
    }else if(string === 'right'){
      isNow = nowAnim === 'right';
      nowAnim = 'right';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animRight);
      }
    }else if(string === 'upLeft'){
      isNow = nowAnim === 'upLeft';
      nowAnim = 'upLeft';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animUpLeft);
      }
    }else if(string === 'upRight'){
      isNow = nowAnim === 'upRight';
      nowAnim = 'upRight';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animUpRight);
      }
    }else if(string === 'downLeft'){
      isNow = nowAnim === 'downLeft';
      nowAnim = 'downLeft';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animDownLeft);
      }
    }else if(string === 'downRight'){
      isNow = nowAnim === 'downRight';
      nowAnim = 'downRight';
      if (isNow){
        this.spriteSheet.gotoAndPlay(this.animDownRight);
      }
    }
  },
});
