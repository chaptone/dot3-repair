var GameLayer = cc.LayerColor.extend({
  ball :[],
  weed :[],
  init: function() {
    this._super( new cc.Color( 0, 0, 0, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );

    this.level = 0;

    this.scoreLabel();
    this.timeLabel();
    this.levelLabel();

    this.addKeyboardHandlers();
    this.dot = new Player();
    this.dot.setPosition( new cc.Point( 400, 300 ) );
    this.addChild( this.dot );
    this.dot.scheduleUpdate();

    cc.audioEngine.playMusic(res.Main_Music,false);

    this.time = 3600;
    this.score = 0;
    this.countBall = 3;
    this.numBall = 3;
    this.min = 3;

    console.log(this.level);

    this.setBall();
    // this.setWeed();

    return true;
  },

  onKeyDown: function( keyCode, event ) {
    if ( keyCode == cc.KEY.right ) {
      this.dot.switchDirection( 4 );
    }
    else if ( keyCode == cc.KEY.up ) {
      this.dot.switchDirection( 1 );
    }
    else if ( keyCode == cc.KEY.left ) {
      this.dot.switchDirection( 3 );
    }
    else if ( keyCode == cc.KEY.down ) {
      this.dot.switchDirection( 2 );
    }
  },

  onKeyUp: function( keyCode, event ) {

    if ( keyCode == cc.KEY.right ) {
      this.dot.switchDirectionRelease( 4 );
    }
    else if ( keyCode == cc.KEY.up ) {
      this.dot.switchDirectionRelease( 1 );
    }
    else if ( keyCode == cc.KEY.left ) {
      this.dot.switchDirectionRelease( 3 );
    }
    else if ( keyCode == cc.KEY.down ) {
      this.dot.switchDirectionRelease( 2 );
    }

  },

  addKeyboardHandlers: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed : function( keyCode, event ) {
        self.onKeyDown( keyCode, event );
      },
      onKeyReleased: function( keyCode, event ) {
        self.onKeyUp( keyCode, event );
      }
    }, this);
  },

  setX: function() {
    var min = this.min;
    var max = min;
    var coordX = Math.random()*(max-min)+min;
    var maxOrMin = Math.random() * 2;
    if( maxOrMin <= 1 ) return -coordX;
    return coordX;
  },
  setY: function() {
    var min = this.min;
    var max = this.min+3;
    var coordY = Math.random()*(max-min)+min;
    var maxOrMin = Math.random() * 2;
    if( maxOrMin <= 1 ) return -coordY;
    return coordY;
  },

  setBall: function(){
    for(var i = 0 ; i < this.numBall ; i++){
      this.ball[i] = new Whitedot();
      this.ball[i].vx = this.setX();
      this.ball[i].vy = this.setY();
      this.addChild(this.ball[i]);
    }
  },

  setWeed: function(){
     for(var i = 0 ; i < this.numBall ; i++ ) {
      this.weed[i] = new obReduce();
      this.addChild( this.weed[i] );
     }
  },

  scoreLabel: function(){
    this.scoreLabel = cc.LabelTTF.create( '0', 'Emulator', 20 );
    this.scoreLabel.setPosition( new cc.Point( 750, 550 ) );
    this.addChild( this.scoreLabel );
    this.scheduleUpdate();
  },

  timeLabel: function(){
    this.timeLabel = cc.LabelTTF.create( '0', 'Emulator', 20 );
    this.timeLabel.setPosition( new cc.Point( 400, 550 ) );
    this.addChild( this.timeLabel );
    this.scheduleUpdate();

  },

  levelLabel: function(){
    this.levelLabel = cc.LabelTTF.create( '0', 'Emulator', 20 );
    this.levelLabel.setPosition( new cc.Point( 100, 550 ) );
    this.levelLabel.setString("LEVEL "+this.level);
    this.addChild( this.levelLabel );
    this.scheduleUpdate();
  },

  isEnd: function(){
    cc.audioEngine.stopMusic();
    cc.audioEngine.playEffect(res.Pickup_sound,false);
    var scene = new newEndgame();
    cc.director.pushScene(scene);
  },
  // ballCloseToWeed: function(){
  //   for( var i = 0 ; i < this.weed.length ; i++ ){
  //     if( this.ball[i] )
  //   }
  // },
  update: function( dt ) {
    this.time--;
    this.timeLabel.setString( parseInt(this.time/60) );
    if(this.time/60 == 0 ) this.isEnd();
    for(var i = 0 ; i < this.numBall ; i ++){
      if ( this.ball[i].closeTo( this.dot ) ) {
        cc.audioEngine.playEffect(res.Pickup_sound,false);
        this.score+=this.min;
        this.scoreLabel.setString( this.score + "" );
        this.removeChild( this.ball[i] );
        this.countBall--;
        this.ball[i].setPosition( new cc.Point(-30,-30));
        if( this.countBall == 0 ){
          this.level+=1;
          this.levelLabel.setString("LEVEL "+this.level);
          this.numBall+=1;
          this.countBall = this.numBall;
          this.min+=1;
          this.setBall();
         }
      }
     }
  },
});
var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});
