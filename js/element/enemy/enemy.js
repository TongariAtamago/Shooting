//sh.enemyを定義
phina.define('sh.enemy', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function() {
    this.superInit();
    this.hp = null;//体力
    this.starL = null;//ラージスター
    this.starS = null;//スモールスター
  },
  //アップデート処理
  update: function() {
    //TODO
  },
  //爆発
  bom: function() {
    //TODO
  },
});
