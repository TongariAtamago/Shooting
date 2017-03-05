//phina.jsをグローバル領域に展開
phina.globalize();
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    startLabel: 'main',// MainScene から開始
  });
  app.enableStats();//fpsの表示、重いので要らなければコメントアウトする
  app.replaceScene(MainSequence());
  app.run();// 実行
});
