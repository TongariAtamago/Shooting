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
    this.anim          =['p0','p1','p2','p3'][type];//アニメーション
    //                ショット/レーザー/エキスパート/ビギナー
    this.bulletStyle   =  [　 10,   20,    20,   10][style];//弾の間の角

    //ポジション
    this.setPosition(SC_W/2,SC_H/2);
    //ライト
    var lightGrad = Canvas.createRadialGradient(0, 0, 80, 0, 0, 25);
    lightGrad.addColorStop(0, 'rgba(255,255,255,0.0)');
    lightGrad.addColorStop(0.8, 'rgba(255,255,255,0.09)');
    lightGrad.addColorStop(1, 'rgba(255,255,255,0.09)');
    this.light = CircleShape({
      radius: 80,
      fill: lightGrad,
      strokeWidth: 0,
    }).addChildTo(this);
    //画像
    this.image = Sprite('player_image',64,64).addChildTo(this);
    this.spriteSheet = FrameAnimation ('player_ss');
    this.spriteSheet.attachTo(this.image);
    this.spriteSheet.nowAnim = 'top';
    this.spriteSheet.gotoAndPlay(this.anim);
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
      this.bulletAngle = [[   40,   80,   60,   60][this.type],//基本弾角度
      /*hlv1 の弾角度*/    [   60,  100,   80,   80][this.type],
      /*hlv2 の弾角度*/    [   80,  120,  100,  100][this.type],
      /*hlv3 の弾角度*/    [   80,  140,  120,  120][this.type],
      /*hlv4 の弾角度*/    [  100,  160,  140,  140][this.type],
      /*hlv5 の弾角度*/    [  100,  160,  140,  140][this.type],
      /*hlv6 の弾角度*/    [  100,  160,  140,  140][this.type],
      /*hlv7 の弾角度*/    [  140,  180,  160,  160][this.type],
      /*hlv8 の弾角度*/    [  140,  200,  160,  180][this.type],
      /*hlv9 の弾角度*/    [  160,  220,  180,  180][this.type],
      /*hlv10の弾角度*/    [  180,  240,  200,  200][this.type]][this.hyperLevel];
    }else{
      this.bulletAngle =  [   40,   80,   60,   60][this.type];//基本弾角度
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
        var bullet = sh.playerBullet(this.rotation,bulletSty).addChildTo(this.parent);
      }
    }
    //回転
    if (key.getKey('x')) { this.rotation += vRotationSpeed; }//右回転
    if (key.getKey('z')) { this.rotation -= vRotationSpeed; }//左回転
    // 移動
    if(this.y >= 32 && key.getKey('up')) {
      this.y -= vSpeed;
    }
    if(SC_H - 32 >= this.y && key.getKey('down')) {
      this.y += vSpeed;
    }
    if(this.x >= 32 && key.getKey('left')) {
      this.x -= vSpeed;
    }
    if(SC_W - 32 >= this.x && key.getKey('right')) {
      this.x += vSpeed;
    }
  },
});
