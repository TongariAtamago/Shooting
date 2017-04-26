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
    (3).times(function(i){
      this.hyperBits[i] = Sprite('player_image_accessory',32,32).addChildTo(this);
      this.hyperBits[i].frameIndex = this.bitFrame;
      this.hyperBits[i].visible = false;
    },this);
  },
  update: function(){
    if(this.parent.hyper){
      if(this.visible === false){
        (3).times(function(i){
          this.hyperBits[i].visible = true;
        },this);
      }else{
        (3).times(function(i){
          this.hyperBits[i].visible = true;
        },this);
      }
    }
  }
});
