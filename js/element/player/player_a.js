//プレイヤー(タイプA)
var PLAYER_TYPE_A = PLAYER();
PLAYER_TYPE_A.speed = 4;//スピード
PLAYER_TYPE_A.rotationSpeed = 2;//回転スピード
PLAYER_TYPE_A.rotation = 0;//回転
PLAYER_TYPE_A.bulletAngle = 90;//弾の打てる角度
//とりあえず見た目の図形  将来イメージにする
var PLAYER_TYPE_A_IMAGE = RectangleShape({
  width: 64,
  height: 64,
  fill: 'red',
}).addChildTo(PLAYER_TYPE_A);
var PLAYER_TYPE_A_COLLISION = CircleShape({
  radius: 4,
  fill: 'blue',
}).addChildTo(PLAYER_TYPE_A);
