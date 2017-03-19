//sh.playerTypeAを定義
phina.define('sh.playerTypeA', {
  //sh.entityクラスを継承
  superClass: 'sh.player',
  //初期化
  init: function() {
    this.superInit();
    this.speed = 4;//スピード
    this.rotationSpeed = 2;//回転スピード
    this.bulletAngle = 80;//弾の角度
    this.imageIndex = 0;//イメージインデックス
  },
});
