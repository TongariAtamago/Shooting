//sh.playerBitを定義
phina.define('sh.playerBit', {
  superClass: 'DisplayElement',
  //初期化
  init: function(type) {
    this.superInit();
    this.bits = [];
    this.bitFrame = 16 + type;
    (6).times(function(i){
      this.bits[i] = Sprite('player_image_accessory',32,32).addChildTo(this);
      this.bits[i].frameIndex = this.bitFrame;
      this.bits[i].x = [-54,54,-88,88,-122,122][i];
      this.bits[i].y = [10,10,16,16,22,22][i];
    },this);
    this.hyperBits = [];
    (10).times(function(i){
      this.hyperBits[i] = Sprite('player_image_accessory',32,32).addChildTo(this);
      this.hyperBits[i].frameIndex = this.bitFrame;
      this.hyperBits[i].visible = false;
    },this);
  },
  update: function(app){
    if (app.frame % 6 === 0) {
      (6).times(function(i){
        var vx = Vector2().fromDegree(this.parent.rotation,this.bits[i].x);
        var vy = Vector2().fromDegree(this.parent.rotation,this.bits[i].y);
        var bullet = sh.playerBullet(
          this.parent.x + vx.x,
          this.parent.y + vy.y,
          this.parent.rotation - this.bits[i].rotation,
          this.parent.type
        ).addChildTo(this.parent.parent);
      },this);
    }
    if(this.parent.hyper){
      (this.parent.hyperLevel).times(function(i){
        this.hyperBits[i].visible = true;
        var r = 360 / this.parent.hyperLevel;
        r += i * r;
        var s;
        if(i % 2 === 0){
          s = app.frame * 6.1;
        }else{
          s = app.frame * -6.4;
        }
        var v = Vector2().fromDegree(r - 150 + s, 60);
        this.hyperBits[i].setPosition(v.x,v.y);
        this.hyperBits[i].rotation = r + s -60;
      },this);
    }else{
      this.hyperBits[i].visible = false;
    }
  }
});
