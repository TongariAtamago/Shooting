//phina.jsをグローバル領域に展開
phina.globalize();


//定数
var SC_W = 1024;// 画面横サイズ
var SC_H = 640;// 画面縦サイズ
var FPS = 80;//FPS
var SCENE_DEFAULT = {
  width: SC_W,
  height: SC_H,
};//シーンのデフォルト
var GAME_TITLE = 'Shooting(仮)'//タイトル
var GAME_VERSION = 'version Pre-Alpha 0.0'//バージョン情報

//ネームスペース
var sh = {};

/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    backgroundColor: '#000011',//背景色
    width: SC_W,//幅
    height: SC_H,//高さ
    fit: true,//フィット
  });
  //app.enableStats();//fpsの表示
  app.replaceScene(sh.MainSequence());
  app.run();// 実行
});
