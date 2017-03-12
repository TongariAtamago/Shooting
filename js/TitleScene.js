//MainSceneを定義
phina.define('sh.TitleScene', {

  //DisplaySceneクラスを継承
  superClass: 'DisplayScene',

  //初期化
  init: function() {
    this.superInit(SCENE_DEFAULT);
    //ラベルをグループ化
    var labelGroup = DisplayElement().addChildTo(this);
    //タイトルラベル
    TITLE_LABEL.addChildTo(labelGroup).setPosition(this.gridX.center(),this.gridY.center(-4));
    //バージョン情報
    TITLE_VERSION.addChildTo(labelGroup).setPosition(this.gridX.center(),this.gridY.center(-2));
    //スペースバー押せ！
    TITLE_PRESS.addChildTo(labelGroup).setPosition(this.gridX.center(),this.gridY.center(4));
  },
  //アップデート時の処理
  update: function(app) {
    var key = app.keyboard;
    // スペースバー感知
    if (key.getKey('space')) { this.exit() }
  }
});
