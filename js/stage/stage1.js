//Sceneを定義
phina.define('sh.GameStage1', {

  //DisplaySceneクラスを継承
  superClass: 'DisplayScene',

  //初期化
  init: function() {
    this.superInit(SCENE_DEFAULT);

    player = sh.player(2,1).addChildTo(this);
  },
});
