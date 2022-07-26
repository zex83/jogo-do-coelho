const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
const Body = Matter.Body
const Composites = Matter.Composites
const Composite = Matter.Composite

let engine
let world

let ground
let rope
let rope2
let rope3

let melon,melonImg
let backgroundImg
let rabbit
let button1
let button2
let button3
let button4
let button5

let blinkImg,sadImg,eatImg

let gameSound,eatSound,sadSound,airSound


let link
let link2
let link3

function preload() {
  backgroundImg = loadImage ('assets/background.png')

  melonImg = loadImage ('assets/melon.png')

  blinkImg = loadAnimation ('assets/blink_1.png','assets/blink_2.png','assets/blink_3.png')
  eatImg = loadAnimation ('assets/eat_1.png','assets/eat_2.png','assets/eat_3.png','assets/eat_4.png','assets/eat_5.png')
  sadImg = loadAnimation ('assets/sad_1.png','assets/sad_2.png','assets/sad_3.png')

  gameSound = loadSound ('assets/background_sound.mp3')
  eatSound = loadSound ('assets/eating_sound.mp3')
  sadSound = loadSound ('assets/sad_sound.wav')
  airSound = loadSound ('assets/air_sound.wav')

  blinkImg.frameDelay = 20
  eatImg.frameDelay = 20
  sadImg.frameDelay = 20

  blinkImg.playing = true
  sadImg.playing = true
  eatImg.playing = true

  blinkLooping = true
  sadLooping = false
  eatLooping = false
}

function setup() {
  createCanvas(500,700)

  engine = Engine.create()
  world = engine.world
 
  rectMode(CENTER)
  ellipseMode(RADIUS)
  imageMode (CENTER)
  textSize(50)

  // criei um objeto do modelo Ground  || não ligo
  ground = new Ground(250, 650, 500, 10)
  rope = new Rope (8, {x: 49, y: 30  })
  rope2 = new Rope (7, {x: 370, y: 40})
  rope3 = new Rope (4, {x: 400, y: 225})
  const melonOptions = {
    density:0.001
  }

  melon = Bodies.circle (300,300,20,melonOptions)
  Composite.add (rope.body, melon)

  link = new Link (rope,melon)
  link2 = new Link (rope2,melon)
  link3 = new Link (rope3,melon)

  rabbit = createSprite (300,620)
  rabbit.addAnimation ('blink',blinkImg)
  rabbit.addAnimation ('eat',eatImg)
  rabbit.addAnimation ('sad',sadImg)
  rabbit.scale = 0.2

  button1 = createImg ('assets/cut_button_1.png')
  button1.position (20,30)
  button1.size (50,50)
  button1.mouseClicked (drop)

  button4 = createImg ('assets/cut_button_1.png')
  button4.position (330,35)
  button4.size (50,50)
  button4.mouseClicked (drop2)

  button5 = createImg ('assets/cut_button_1.png')
  button5.position (360,200)
  button5.size (50,50)
  button5.mouseClicked (drop3)

  button2 = createImg ('assets/mute_button.png')
  button2.position (450,20)
  button2.size (30,30)
  button2.mouseClicked (mute)

  button3 = createImg ('assets/balloon_1.png')
  button3.position (10,250)
  button3.size (150,100)
  button3.mouseClicked (airBlow)

  gameSound.play ()
  gameSound.setVolume (0.5)

}

function draw() {
  background('gray')
  image (backgroundImg,width/2,height/2,width,height)
  
  Engine.update(engine)

  rope.show ()
  rope2.show ()
  rope3.show ()

  if (melon !== null) {
    image (melonImg,melon.position.x,melon.position.y,70,70)
  }

  if (collide (melon, rabbit)) {
    eatSound.play ()
    rabbit.changeAnimation ('eat')
  }

  

  if (melon !== null && melon.position.y >= 625) {
    sadSound.play ()
    rabbit.changeAnimation ('sad')
    melon = null
  } 

 // ground.display ()
  
  drawSprites ()
}

function drop ( ) {
  rope.break ()
  link.detach ()
  link = null
}

function drop2 ( ) {
  rope2.break ()
  link2.detach ()
  link2 = null
}

function drop3 ( ) {
  rope3.break ()
  link3.detach ()
  link3 = null
}

function collide (body1,body2) {
if (body1 !== null) {
  let distance = dist (body1.position.x,body1.position.y,body2.position.x,body2.position.y)
  if (distance <= 80) {
    console.log ('distance',distance)
    World.remove (world,melon)
    melon = null
    return true
  } else  {
    return false
  }
}
}

function mute () {
  if (gameSound.isPlaying ()) {
  gameSound.stop ()
  } else {
    gameSound.play ()
  }
}

function airBlow () {
  Body.applyForce (melon, {x: 0, y: 0}, {x: 0.01, y: 0})
  airSound.play ()
}





