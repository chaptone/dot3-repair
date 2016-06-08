var obReduce = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile( 'res/images/drug.png' );
    this.setPosition(new cc.p ( Math.random()*(760-40)+20 , 600 ));

    var sprite_action = new cc.EaseBounceOut(new cc.MoveBy(1,cc.p(0,-Math.random()*(560-100)+20)));
    this.runAction(sprite_action);
  },
  closeTo: function( obj ) {
    var myPos = this.getPosition();
    var oPos = obj.getPosition();
    return ( ( Math.abs( myPos.x - oPos.x ) <= 25 ) &&
    ( Math.abs( myPos.y - oPos.y ) <= 25 ) );
  },
});
