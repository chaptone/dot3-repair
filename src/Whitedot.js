var Whitedot = cc.Sprite.extend({

  ctor: function() {
    this._super();
    this.initWithFile( 'res/images/white_dot.png' );
    this.scheduleUpdate();

    var sprite_action = cc.TintBy.create(0.5,-255,-127,-190);
    var repeat_action = cc.Repeat.create(sprite_action,100);
    this.runAction(repeat_action);

    this.setPosition(new cc.Point(Math.random()*780,Math.random()*580));
    this.vx = 5;
    this.vy = 5;

  },

  maxV: function(){
    var max = this.v;
    var min = this.v - 3;
    var temp = Math.random()*( max - min ) + min;
    return temp;
  },

  minV: function(){
    var max = - this.v;
    var min = - ( this.v - 3 );
    var temp = Math.random()*( max - min ) + min;
    return temp;
  },

  setV: function( newV ){
    this.v = newV;
  },

  setVX: function(){
    var maxOrMin = Math.random() * 2;
    if( maxOrMin <= 1 ) this.vx = -this.vx;
  },

  setVY: function(){
    var maxOrMin = Math.random() * 2;
    if( maxOrMin <= 1 ) this.vy = -this.vy;
  },


  moveX: function(){
    var pos = this.getPosition();
    if( pos.x > 780 ) this.vx = - this.vx;
    else if( pos.x < 20 ) this.vx = Math.abs( this.vx );
    return this.vx;
  },

  moveY: function(){
    var pos = this.getPosition();
    if( pos.y > 580 ) this.vy = - this.vy;
    else if( pos.y < 20 ) this.vy = Math.abs( this.vy );
    return this.vy;
  },

  update: function( dt ) {
    var pos = this.getPosition();
    this.setPosition( new cc.Point( pos.x + this.moveX() , pos.y + this.moveY() ) );
  },

  closeTo: function( obj ) {
    var myPos = this.getPosition();
    var oPos = obj.getPosition();
    return ( ( Math.abs( myPos.x - oPos.x ) <= 25 ) &&
    ( Math.abs( myPos.y - oPos.y ) <= 25 ) );
  },
});
