//sh.playerLaserを定義
phina.define('sh.playerLaser', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //敵に当たってる座標
  hitX : null,
  hitY : null,
  //ボディ
  head : null,
  body : null,
  aura : null,
  //初期化
  init: function(type) {
    this.superInit(20);//当たり判定
    
  },
});
