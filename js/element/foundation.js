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
  init: function(radius,width,height){
    this.superInit();
    var collisionCircle = Circle(0, 0,radius);//当たり判定に使うCircle
    var collisionRect = Rect(0, 0,width,height);//当たり判定に使うRect
  }
});
