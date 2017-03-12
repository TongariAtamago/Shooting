//MainSequenceを定義
phina.define('sh.MainSequence', {
  //ManagerSceneクラスを継承
  superClass: 'ManagerScene',
  //初期化
  init: function() {
    this.superInit({
      scenes:[
        //ローディング
        {
          label: 'load',
          className: 'sh.LoadingScene',
          arguments: { assets: ASSETS, },
        },
        //タイトル
        {
          label: 'title',
          className: 'sh.TitleScene',
        },
        /*
         * アーケードモード
         */
        {
          label: 'arcadeMode',
          className: 'sh.ArcadeModeSequence',
          nextLabel: 'title'
        },
      ]
    });
  },
});
/*
 * アーケードモード
 */
phina.define("sh.ArcadeModeSequence", {
  superClass: "ManagerScene",
  init: function() {
    this.superInit({
      scenes: [
        //ステージ1
        {
          label: "stage1preload",
          className: "sh.LoadingScene",
          arguments: { assets: ASSETS_STAGE1, },
        },
        {
          label: "stage1",
          className: "sh.GameStage1",
        },
        {
          label: "stage1result",
          className: "sh.ResultScene",
          arguments: { stageId:1 },
        },
        //エンディング
        {
          label: "ending",
          className: "sh.EndingScene",
        },
        //ゲームオーバー
        {
          label: "gameover",
          className: "sh.GameoverScene",
        },
      ],
    });
  },
  onfinish: function() {
    this.exit();
  }
});
