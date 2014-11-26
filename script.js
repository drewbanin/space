var c = document.getElementById("space");
ctx = c.getContext("2d");
ctx.strokeStyle = "rgba(255,255,255,1)";

var HEIGHT = 800;
var WIDTH = 1300;

var CENTER = {x: WIDTH / 2, y: HEIGHT / 2};

var sun = new Sun(CENTER, 50, 50, 1000, -0.1, "#FFF76A");

var mercury = new Planet({
  name: 'mercury',
  freq: 110,
  orbit: {
    around: sun,
    radius: 50,
  },
  number: 1,
  radius: 3,
  mass: 20,
  color: "#5D7A8C"
});

var venus = new Planet({
  name: 'venus',
  freq: 220,
  orbit : {
    around: sun,
    radius: 80,
  },
  number: 2,
  radius: 5,
  mass: 50,
  color: "#21A4CF"
});


var earth = new Planet({
  name: 'earth',
  freq: 330,
  orbit : {
    around: sun,
    radius: 120,
  },
  number: 3,
  radius: 7,
  mass: 20,
  color: "#61A4CF"
});

var moon = new Planet({
  isMoon: true,
  name: 'moon',
  freq: 440,
  orbit : {
    around: earth,
    radius: 20,
  },
  number: 1,
  radius: 2,
  mass: 80,
  color: "#B4B4C2"
});

var mars = new Planet({
  name: 'mars',
  freq: 550,
  orbit: {
    around: sun,
    radius: 140,
  },
  number: 4,
  radius:  4,
  mass: 60,
  color: "#A34939"
});

var asteroidBelt = new AsteroidBelt({
  orbit: {
    around: sun,
    radius: 200,
  },
  count: 100,
  maxOffset: 20,
  color: '#2E383D'
});

var jupiter = new Planet({
  name: 'jupiter',
  freq: 660,
  orbit: {
    around: sun,
    radius: 280,
  },
  number: 5,
  radius:  10,
  mass: 220,
  color: "#8A823E"
});


var ganymede = new Planet({isMoon: true, number: 1, name: 'ganyemede', orbit : {around: jupiter, radius: 20}, radius: 2.0, mass: 12, color: "#B4B4C2"});
var callisto = new Planet({isMoon: true, number: 2, name: 'callisto', orbit : {around: jupiter, radius: 25}, radius: 2.0, mass: 8,  color: "#B4B4C2"});
var io       = new Planet({isMoon: true, number: 3, name: 'io', orbit : {around: jupiter, radius: 30}, radius: 2.5, mass: 6,  color: "#B4B4C2"});
var europa   = new Planet({isMoon: true, number: 4, name: 'europa', orbit : {around: jupiter, radius: 35}, radius: 3.0, mass: 18, color: "#B4B4C2"});

var saturn = new Planet({
  name: 'saturn',
  freq: 770,
  orbit: {
    around: sun,
    radius: 340,
  },
  number: 6,
  radius:  15,
  mass: 200,
  color: "#534135"
});

var uranus = new Planet({
  name: 'uranus',
  freq: 880,
  orbit: {
    around: sun,
    radius: 400,
  },
  number: 7,
  radius:  10,
  mass: 220,
  color: "#2F3B78"
});

var neptune = new Planet({
  name: 'neptune',
  freq: 990,
  orbit: {
    around: sun,
    radius: 480,
  },
  number: 8,
 radius:  12,
 mass: 220,
 color: "#253840"
});

var oortCloud = new AsteroidBelt({
  orbit: {
    around: sun,
    radius: 600,
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
_.each(_.range(2), function(i) {
  milkyWay.addBody(new Planet({isMoon: true, name: 'jupiter_' + i, orbit : {around: jupiter, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));
milkyWay.addBody(ganymede);
milkyWay.addBody(callisto);
milkyWay.addBody(io);
milkyWay.addBody(europa);

milkyWay.addBody(saturn);

milkyWay.addBody(uranus);
milkyWay.addBody(neptune);

_.each(_.range(2), function(i) {
  milkyWay.addBody(new Planet({isMoon: true, name: 'saturn_' + i, orbit : {around: saturn, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));

_.each(_.range(1), function(i) {
  milkyWay.addBody(new Planet({isMoon: true, name: 'neptune_' + i, orbit : {around: neptune, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));

_.each(_.range(1), function(i) {
  milkyWay.addBody(new Planet({isMoon: true, name: 'uranus_' + i, orbit : {around: uranus, radius: Math.random() * 20 + 20}, radius: Math.random() + 1, mass: Math.random() + 20 + 5, color: "#B4B4C2"}));
}.bind(this));

milkyWay.addBody(oortCloud);

milkyWay.letThereBeLight();
