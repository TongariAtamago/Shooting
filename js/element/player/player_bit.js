//sh.playerBulletを定義
phina.define('sh.playerBit', {
  superClass: 'DisplayElement',
  //初期化
  init: function() {
    this.superInit();
    this.bits = [];
    (8).times(function(i){
      this.bits[i] = Sprite('player_image_accessory',32,32).addChildTo(this);
      this.bits[i].frameIndex = 17 + player.type;
      this.bits[i].x = [-48,48,-96,96,-144,144,-192,192][i];
      this.bits[i].x = [0,0,16,16,32,32,48,48][i];
    },this);
  },
});
