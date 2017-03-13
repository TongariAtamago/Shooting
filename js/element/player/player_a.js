//プレイヤー(タイプA)
var PLAYER_TYPE_A = PLAYER();
PLAYER_TYPE_A.speed = 10;
PLAYER_TYPE_A.rotationSpeed = 4;
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
