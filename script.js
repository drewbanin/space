var c = document.getElementById("space");
ctx = c.getContext("2d");
ctx.strokeStyle = "rgba(255,255,255,1)";

var HEIGHT = 800;
var WIDTH = 1300;

var CENTER = {x: WIDTH / 2, y: HEIGHT / 2};

var sun = new Triangle(CENTER, 50, 50, 1000, "#FFF76A");

var mercury = new Planet({
  name: 'mercury',
  orbit: {
    around: sun,
    radius: 50
  },
  radius: 3,
  mass: 20,
  color: "#5D7A8C"
});

var venus = new Planet({
  name: 'venus',
  orbit : {
    around: sun,
    radius: 80
  },
  radius: 5,
  mass: 50,
  color: "#21A4CF"
});


var earth = new Planet({
  name: 'earth',
  orbit : {
    around: sun,
    radius: 120
  },
  radius: 7,
  mass: 20,
  color: "#61A4CF"
});

var moon = new Planet({
  name: 'moon',
  orbit : {
    around: earth, radius: 20
  },
  radius: 2,
  mass: 80,
  color: "#B4B4C2"
});

var mars = new Planet({
  name: 'mars',
  orbit: {
    around: sun,
    radius: 140
  },
 radius:  4,
 mass: 60,
 color: "#A34939"
});

var asteroidBelt = new AsteroidBelt({
  orbit: {
    around: sun,
    radius: 200
  },
  count: 100,
  maxOffset: 20,
  color: '#2E383D'
});

var jupiter = new Planet({
  name: 'jupiter',
  orbit: {
    around: sun,
    radius: 280
  },
 radius:  10,
 mass: 220,
 color: "#8A823E"
});


var ganymede = new Planet({name: 'ganyemede', orbit : {around: jupiter, radius: 20}, radius: 2.0, mass: 12, color: "#B4B4C2"});
var callisto = new Planet({name: 'callisto', orbit : {around: jupiter, radius: 25}, radius: 2.0, mass: 8,  color: "#B4B4C2"});
var io       = new Planet({name: 'io', orbit : {around: jupiter, radius: 30}, radius: 2.5, mass: 6,  color: "#B4B4C2"});
var europa   = new Planet({name: 'europa', orbit : {around: jupiter, radius: 35}, radius: 3.0, mass: 18, color: "#B4B4C2"});

var saturn = new Planet({
  name: 'saturn',
  orbit: {
    around: sun,
    radius: 340
  },
 radius:  15,
 mass: 200,
 color: "#534135"
});

var uranus = new Planet({
  name: 'uranus',
  orbit: {
    around: sun,
    radius: 400
  },
 radius:  10,
 mass: 220,
 color: "#2F3B78"
});

var neptune = new Planet({
  name: 'neptune',
  orbit: {
    around: sun,
    radius: 480
  },
 radius:  12,
 mass: 220,
 color: "#253840"
});

var oortCloud = new AsteroidBelt({
  orbit: {
    around: sun,
    radius: 600
  },
  count: 500,
  maxOffset: 100,
  color: '#2E383D'
});

var milkyWay = new SolarSystem(sun, ctx, {width: WIDTH, height: HEIGHT});

milkyWay.addBody(mercury);

milkyWay.addBody(venus);

milkyWay.addBody(mars);

milkyWay.addBody(earth);
milkyWay.addBody(moon);

milkyWay.addBody(asteroidBelt);

milkyWay.addBody(jupiter);
milkyWay.addBody(ganymede);
milkyWay.addBody(callisto);
milkyWay.addBody(io);
milkyWay.addBody(europa);

milkyWay.addBody(saturn);

milkyWay.addBody(uranus);
milkyWay.addBody(neptune);

_.each(_.range(3), function(i) {
  milkyWay.addBody(new Planet({name: 'saturn_' + i, orbit : {around: saturn, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));

_.each(_.range(6), function(i) {
  milkyWay.addBody(new Planet({name: 'neptune_' + i, orbit : {around: neptune, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));

_.each(_.range(12), function(i) {
  milkyWay.addBody(new Planet({name: 'uranus_' + i, orbit : {around: uranus, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));

milkyWay.addBody(oortCloud);

milkyWay.letThereBeLight();
