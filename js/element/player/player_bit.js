//sh.playerBitを定義
phina.define('sh.playerBit', {
  superClass: 'DisplayElement',
  //初期化
  init: function(type) {
    this.superInit();
    this.type = type;
    this.bitFrame = 16 + type;
    this.bits = [];
    (6).times(function(i){
      this.bits[i] = Sprite('player_image_accessory',32,32).addChildTo(this);
      this.bits[i].frameIndex = this.bitFrame;
      if(i <= 2){
        this.bits[i].x = Vector2().fromDegree(20,[54,88,122][i]).x;
        this.bits[i].y = Vector2().fromDegree(20,[54,88,122][i]).y;
        this.bits[i].bx = Vector2().fromDegree(10,[54,88,122][i]).x;
        this.bits[i].by = Vector2().fromDegree(10,[54,88,122][i]).y;
        this.bits[i].rotation = [-4,10,20][i];
      }else{
        this.bits[i].x = Vector2().fromDegree(160,[54,88,122][i - 3]).x;
        this.bits[i].y = Vector2().fromDegree(160,[54,88,122][i - 3]).y;
        this.bits[i].bx = Vector2().fromDegree(170,[54,88,122][i - 3]).x;
        this.bits[i].by = Vector2().fromDegree(170,[54,88,122][i - 3]).y;
        this.bits[i].rotation = [4,-10,-20][i - 3];
      }
    },this);
    this.hyperBits = [];
    (10).times(function(i){
      this.hyperBits[i] = Sprite('player_image_accessory',32,32).addChildTo(this);
      this.hyperBits[i].frameIndex = this.bitFrame;
      this.hyperBits[i].visible = false;
    },this);
  },
  update: function(app){
    this.x = this.player.x;
    this.y = this.player.y;
    (6).times(function(i){
      if(i <= 2){
        this.bits[i].x = Vector2().fromDegree(this.player.rotation + 20,[54,88,122][i]).x;
        this.bits[i].y = Vector2().fromDegree(this.player.rotation + 20,[54,88,122][i]).y;
        this.bits[i].bx = Vector2().fromDegree(this.player.rotation + 10,[54,88,122][i]).x;
        this.bits[i].by = Vector2().fromDegree(this.player.rotation + 10,[54,88,122][i]).y;
        this.bits[i].rotation = this.player.rotation + [-4,10,20][i];
      }else{
        this.bits[i].x = Vector2().fromDegree(this.player.rotation + 160,[54,88,122][i - 3]).x;
        this.bits[i].y = Vector2().fromDegree(this.player.rotation + 160,[54,88,122][i - 3]).y;
        this.bits[i].bx = Vector2().fromDegree(this.player.rotation + 170,[54,88,122][i - 3]).x;
        this.bits[i].by = Vector2().fromDegree(this.player.rotation + 170,[54,88,122][i - 3]).y;
        this.bits[i].rotation = this.player.rotation + [4,-10,-20][i - 3];
      }
      if(app.frame % 6 === 0){
        var bullet = sh.playerBullet(
          this.x + this.bits[i].bx,
          this.y + this.bits[i].by,
          this.bits[i].rotation,
          this.type
        ).addChildTo(this.parent);
      }
    },this);
    if(this.player.hyper){
      (this.player.hyperLevel).times(function(i){
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
