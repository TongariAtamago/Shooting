//MainSceneを定義
phina.define('sh.TitleScene', {

  //DisplaySceneクラスを継承
  superClass: 'DisplayScene',

  //初期化
  init: function() {
    this.superInit(SCENE_DEFAULT);
    //タイトルラベル
    titleLabel.addChildTo(this).setPosition(this.gridX.center(),this.gridY.center(-4));
    //バージョン情報
    titleVersion.addChildTo(this).setPosition(this.gridX.center(),this.gridY.center(-2));
    //スペースバー押せ！
    titlePress.addChildTo(this).setPosition(this.gridX.center(),this.gridY.center(4));
  },
  //アップデート時の処理
  update: function(app) {
    var key = app.keyboard;
    // スペースバー感知
    if (key.getKey('space')) { this.exit();}
  }
});
