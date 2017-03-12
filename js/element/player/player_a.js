//プレイヤー(タイプA)
var PLAYER_TYPE_A = PLAYER();
PLAYER_TYPE_A.speed = 20;
PLAYER_TYPE_A.rotationSpeed = 10;
//とりあえず見た目の図形  将来イメージにする
var PLAYER_TYPE_A_IMAGE = RectangleShape({
  width: 80,
  height: 80,
  fill: 'red',
}).addChildTo(PLAYER_TYPE_A);
var PLAYER_TYPE_A_COLLISION = CircleShape({
  radius: 5,
  fill: 'blue',
}).addChildTo(PLAYER_TYPE_A);
