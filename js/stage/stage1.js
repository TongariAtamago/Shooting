// 定数
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 960;
var SHAPE_SIZE = 16;
var SHAPE_HALF = SHAPE_SIZE / 2;
var HEIGHT_HALF = SCREEN_HEIGHT / 2;
var NUM = 10;

//Sceneを定義
phina.define('sh.GameStage1', {

  //DisplaySceneクラスを継承
  superClass: 'DisplayScene',

  //初期化
  init: function() {
    this.superInit(SCENE_DEFAULT);
    this.player = sh.player(3,1).addChildTo(this);
    this.playerBits = sh.playerBit(this.player.type).addChildTo(this);
    this.playerBits.player = this.player;
    var self = this;
    (NUM).times({
      self.enemys = sh.enemys('blue',16,200).addChildTo(self);
      enemys.x = Random.randint(SHAPE_HALF, SCREEN_WIDTH - SHAPE_HALF);
      enemys.y = Random.randint(SHAPE_HALF, SCREEN_WIDTH - HEIGHT_HALF - SHAPE_HALF);
    });
    var damage = 1
    this.update = function() {
    // 矩形判定
    if (self.hitTestElement(enemys)) {
      enemys.backgroundColor = 'red';
      enemys.hp -= damage;
    }
  },
});
