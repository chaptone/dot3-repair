var Endgame = cc.LayerColor.extend({
  init: function() {
    this._super( new cc.Color( 0, 0, 0, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );

    var sprite = new cc.Sprite.create('res/images/gameover.gif');
    sprite.setAnchorPoint(cc.p(0.5, 0.5));
    sprite.setPosition(cc.p( 400 , 300 ));
    sprite.runAction(cc.blink(70, 100));
    this.addChild(sprite, 0);



    if (cc.sys.capabilities.hasOwnProperty('keyboard')){

      cc.eventManager.addListener(

        {

          event: cc.EventListener.KEYBOARD,

          onKeyPressed:function(key,event){

            console.log("keypress = " + key.toString());

            if( key == 32 ) {

              play();

            }

          }

        }, this);

      }

      return true;
    },

});

var play = function(){

  var scene = new StartScene();
  cc.director.pushScene(scene);
};

var newEndgame = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new Endgame();
    layer.init();
    this.addChild( layer );
  }
});
