//MainSceneを定義
phina.define('TitleScene', {

  //DisplaySceneクラスを継承
  superClass: 'DisplayScene',

  //MainSceneを初期化
  init: function() {
    this.superInit();

    //ここにメインの処理を書いていく
    var label = Label({
      text: 'ShootingGame(Provisional)',
      fontFamily: 'AdventPro-Medium',
    }).addChildTo(this);
    label.setPosition(this.gridX.center(),this.gridY.center());

    var sprite = Sprite('tomapiko_ss').addChildTo(this);
  },
});
