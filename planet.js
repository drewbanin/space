function Planet(data) {
  this.name     = data.name;
  this.freq     = data.freq;
  this.orbit    = data.orbit;
  this.radius   = data.radius;
  this.number   = data.number;
  this.mass     = data.mass;
  this.color    = data.color;
  this.velocity = (this.mass * this.orbit.around.mass) / (this.orbit.radius * this.orbit.radius);
  this.pos      = this.getPos(0);
  this.isMoon   = !!data.isMoon;
  this.prevDeg  = 0;
}

Planet.prototype.justPassed = function(bodyDegrees) {
  return false;
};

Planet.prototype.distanceFrom = function(point) {
  var dx = point.x - this.pos.x;
  var dy = point.y - this.pos.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Planet.prototype.playSound = function(tick) {
  if (this.isMoon) {
  } else {
    //var freq = (990 - this.freq);
    var freqs = [261.6, 329.6, 391.9];
    var sine1 = T("sin", {freq: freqs[this.number % freqs.length] * this.number, mul:0.05});
    var fadeout = this.number * 500;
    T("perc", {r:fadeout+"ms"}, sine1).on("ended", function() {
      this.pause();
    }).bang().play();
  }
};

Planet.prototype.getPos = function(tick) {
  //deg = (tick * (Math.PI / 180) * this.velocity) % (2 * Math.PI);
  //deg = (tick * (Math.PI / 180) * Math.pow(2, 8 - this.number) / 2) % (2 * Math.PI);
  deg = (tick * (Math.PI / 180) * Math.pow(2, 7 - this.number) / 2) % (2 * Math.PI);
  if (Math.cos(this.prevDeg) <= 0 && Math.cos(deg) > 0) {
  //if (Math.sin(this.prevDeg) <= 0 && Math.sin(deg) > 0) {
    this.playSound(tick);
  } else if (Math.sin(this.prevDeg) > 0 && Math.sin(deg) <= 0) {
    //this.playSound(tick);
  }
  this.prevDeg = deg;
  var offset_x = Math.cos(deg) * this.orbit.radius;
  var offset_y = Math.sin(deg) * this.orbit.radius;
  return {
    x: this.orbit.around.pos.x + offset_x,
    y: this.orbit.around.pos.y + offset_y
  }
};

Planet.prototype.draw = function(ctx, tick) {
  this.pos = this.getPos(tick);
  ctx.fillStyle = this.color;
  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
};
