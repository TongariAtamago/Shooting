# ShootingGameつくる！
ShootingGameをつくる！作ってる間に様々なプログラミング技術をつけたい！！
# 構想
PC向け。全方位STGってやつ？TM-Shooter を参考に、それでも違う感じにしていきたい！

使えたらBulletML.jsを使いたいけど使い方全然わからん。どうしてもわからなかったら自分で弾を実装する。そもそも弾幕STGプレイするの下手だし。
# シーン構成
今のところ考えてるのはこんな感じ。ローディングシーンをどうやって実装すれば良いんかわからん...

https://github.com/minimo/QuestForTanelorn/blob/master/src/scene/loadingscene.js を参考にしたい。

プラクティスモードもつけたい。
```
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

```
# オープンソースで開発？
ある程度形になったらオープンソース複数人で開発したい！（主に友達と自分かな？）

それ以外に phina.js に詳しい人に質問攻めをしまくる可能性あり。（なるべく自分で調べるけどww）

あと、WebGLで高速化もしたい！！でも全然わかんない...GLboostが完成したらそれを使いたい。

詳しい人にある程度作ってもらうってのもありかな？

#完成時期

自分のペースでやっていく。他にも今作ってるサイトも完成させていきたいし、phina.jsにプルリクエストも送ってみたいので、完成はまだまだ先かな？
