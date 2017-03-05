//MainSequenceを定義
phina.define('MainSequence', {
  //ManagerSceneクラスを継承
  superClass: 'ManagerScene',
  //初期化
  init: function() {
    this.superInit({
      scenes:[
        //ローディング
        {
          label: 'load',
          className: 'LoadingScene',
          arguments: { stageId:0 },
        },
        //タイトル
        {
          label: 'title',
          className: 'TitleScene',
        },
        /*
         * アーケードモード
         */
        {
          label: 'arcadeMode',
          className: 'ArcadeModeSequence',
          nextLabel: 'title'
        },
      ]
    });
  },
});
/*
 * アーケードモード
 */
phina.define("ArcadeModeSequence", {
  superClass: "ManagerScene",
  init: function() {
    this.superInit({
      scenes: [
        //ステージ1
        {
          label: "stage1preload",
          className: "LoadingScene",
        },
        {
          label: "stage1",
          className: "GameStage1",
        },
        {
          label: "stage1result",
          className: "ResultScene",
          arguments: { stageId:1 },
        },
        //エンディング
        {
          label: "ending",
          className: "EndingScene",
        },
        //ゲームオーバー
        {
          label: "gameover",
          className: "GameoverScene",
        },
      ],
    });
  },
  onfinish: function() {
    this.exit();
  }
});
