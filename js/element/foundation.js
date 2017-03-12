//sh.Labelを定義
phina.define('sh.Label', {
  //Labelクラスを継承
  superClass: 'Label',
  //初期化
  init: function(app) {
    this.superInit({
      fontFamily: 'AdventPro-Medium',
      text: app.text,//テキスト
      fill: app.fill,//フィル
      fontSize: app.fontSize,//フォントサイズ
    });
  },
});
//sh.entityを定義
phina.define('sh.entity', {
  //DisplayElementクラスを継承
  superClass: 'DisplayElement',
  //初期化
  init: function(x,y,circle){
    this.superInit()
    this.x = x;//x座標
    this.y = y;//y座標
    var circle = Circle(0, 0,circle);//当たり判定に使うCircle
  }
});
