//sh.playerBulletを定義
phina.define('sh.playerBullet', {
  //sh.entityクラスを継承
  superClass: 'sh.entity',
  //初期化
  init: function(type) {
    this.superInit(20);//当たり判定
    
  },
});
