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
  //ハイパー
  hyper: false,
  //ハイパーレベル 1~10
  hyperLevel: 0,
  //弾やレーザーのrotation
  vRotation: 0,
  //当たり判定のある場所
  hitCircle: null,
  //初期化
  init: function(type,style) {
    this.superInit(4);//当たり判定radius
    this.type = type;//type
    this.style = style;//style
    this.bulletAngle   = null;//弾角度　updateで変えてる
    //                        赤    緑    青   ピンク
    this.speed         =  [  6.0,  5.0,  4.5,  5.5][type];//スピード
    this.rotationSpeed =  [  2.5,  2.0,  3.0,  2.0][type];//回転スピード
    this.animTop       =['p0_0','p1_0','p2_0','p3_0'][type];//通常
    this.animLeft      =['p0_1','p1_1','p2_1','p3_1'][type];//左
    this.animRight     =['p0_2','p1_2','p2_2','p3_2'][type];//右
    this.animUp        =['p0_3','p1_3','p2_3','p3_3'][type];//上
    this.animDown      =['p0_4','p1_4','p2_4','p3_4'][type];//下
    this.animUpLeft    =['p0_5','p1_5','p2_5','p3_5'][type];//左上
    this.animUpRight   =['p0_6','p1_6','p2_6','p3_6'][type];//右上
    this.animDownLeft  =['p0_7','p1_7','p2_7','p3_7'][type];//左下
    this.animDownRight =['p0_8','p1_8','p2_8','p3_8'][type];//右下
    //                ショット/レーザー/エキスパート/ビギナー
    this.bulletStyle   =  [　 10,   20,    20,   10][style];//弾の間の角

    //ポジション
    this.setPosition(SC_W/2,SC_H/2);
    //ライト
    var lightGrad = Canvas.createRadialGradient(0, 0, 100, 0, 0, 25);
    lightGrad.addColorStop(0, 'rgba(255,255,255,0.0)');
    lightGrad.addColorStop(0.7, 'rgba(255,255,255,0.1)');
    lightGrad.addColorStop(1, 'rgba(255,255,255,0.1)');
    this.light = CircleShape({
      radius: 100,
      fill: lightGrad,
      strokeWidth: 0,
    }).addChildTo(this);
    this.light.update = function(app) {
      var s = 1.2 + Math.sin(app.frame * 0.04) * 0.06;
      this.scale.set(s, s);
    };
    //画像
    this.image = Sprite('player_image',64,64).addChildTo(this);
    this.spriteSheet = FrameAnimation ('player_ss');
    this.spriteSheet.attachTo(this.image);
    this.spriteSheet.nowAnim = 'top';
    this.spriteSheet.gotoAndPlay(this.animTop);
    //ヒットする点
    this.hitCircle = Sprite('tex0',20,20).addChildTo(this);
    this.hitCircle.frameIndex = 5;
    this.hitCircle.update = function(app) {
      var s = 1.2 + Math.sin(app.frame * 0.2) * 0.15;
      this.scale.set(s, s);
    };
  },
  //アップデート時の処理
  update: function(app) {
    var key = app.keyboard;//key取得
    var vSpeed = null;//実質スピード
    var vRotationSpeed = null;//実質回転スピード
    if (this.hyper){//         赤    緑    青 ピンク
      this.bulletAngle = [[   60,   80,   40,   60][this.type],//基本弾角度
      /*hlv1 の弾角度*/    [   80,  100,   60,   80][this.type],
      /*hlv2 の弾角度*/    [  100,  120,   80,  100][this.type],
      /*hlv3 の弾角度*/    [  120,  140,   80,  120][this.type],
      /*hlv4 の弾角度*/    [  140,  160,  100,  140][this.type],
      /*hlv5 の弾角度*/    [  140,  160,  100,  140][this.type],
      /*hlv6 の弾角度*/    [  140,  160,  100,  140][this.type],
      /*hlv7 の弾角度*/    [  160,  180,  140,  160][this.type],
      /*hlv8 の弾角度*/    [  160,  200,  140,  180][this.type],
      /*hlv9 の弾角度*/    [  180,  220,  160,  180][this.type],
      /*hlv10の弾角度*/    [  200,  240,  180,  200][this.type]][this.hyperLevel];
    }else{
      this.bulletAngle =  [   60,   80,   40,   60][this.type];//基本弾角度
    }

    //Cキー
    if (key.getKey('c')) {
      vSpeed = this.speed / 4;
      vRotationSpeed = this.rotationSpeed / 4;
    } else {
      vSpeed = this.speed;
      vRotationSpeed = this.rotationSpeed;
      //弾の発射
      var bulletSty = null;
      var bulletAng = null;
      if (this.hyper) {
        bulletSty = 4;
      } else {
        bulletSty = this.type;
      }
      if (app.frame % 8 === 0) {
        (this.bulletAngle / this.bulletStyle + 1).times(function(i){
          var bullet = sh.playerBullet(- this.bulletAngle / 2 + (this.bulletStyle * i) + this.vRotation,bulletSty).addChildTo(this.parent);
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
    if(string === 'top'){
      if(this.spriteSheet.nowAnim === 'top'){} else {
        this.spriteSheet.gotoAndPlay(this.animTop);
        this.spriteSheet.nowAnim = 'top';
      }
    }
    if(string === 'up'){
      if(this.spriteSheet.nowAnim === 'up'){} else {
        this.spriteSheet.gotoAndPlay(this.animUp);
        this.spriteSheet.nowAnim = 'up';
      }
    }
    if(string === 'down'){
      if(this.spriteSheet.nowAnim === 'down'){} else {
        this.spriteSheet.gotoAndPlay(this.animDown);
        this.spriteSheet.nowAnim = 'down';
      }
    }
    if(string === 'left'){
      if(this.spriteSheet.nowAnim === 'left'){} else {
        this.spriteSheet.gotoAndPlay(this.animLeft);
        this.spriteSheet.nowAnim = 'left';
      }
    }
    if(string === 'right'){
      if(this.spriteSheet.nowAnim === 'right'){} else {
        this.spriteSheet.gotoAndPlay(this.animRight);
        this.spriteSheet.nowAnim = 'right';
      }
    }
    if(string === 'Upleft'){
      if(this.spriteSheet.nowAnim === 'Upleft'){} else {
        this.spriteSheet.gotoAndPlay(this.animUpLeft);
        this.spriteSheet.nowAnim = 'Upleft';
      }
    }
    if(string === 'upRight'){
      if(this.spriteSheet.nowAnim === 'upRight'){} else {
        this.spriteSheet.gotoAndPlay(this.animUpRight);
        this.spriteSheet.nowAnim = 'upRight';
      }
    }
    if(string === 'downLeft'){
      if(this.spriteSheet.nowAnim === 'downLeft'){} else {
        this.spriteSheet.gotoAndPlay(this.animDownLeft);
        this.spriteSheet.nowAnim = 'downLeft';
      }
    }
    if(string === 'downRight'){
      if(this.spriteSheet.nowAnim === 'downRight'){} else {
        this.spriteSheet.gotoAndPlay(this.animDownRight);
        this.spriteSheet.nowAnim = 'downRight';
      }
    }
  },
});
