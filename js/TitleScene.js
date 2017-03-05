//MainSceneを定義
phina.define('TitleScene', {

  //DisplaySceneクラスを継承
  superClass: 'DisplayScene',

  //MainSceneを初期化
  init: function() {
    this.superInit();

    //ここにメインの処理を書いていく
    var label = Label('hello').addChildTo(this);
  },
});
