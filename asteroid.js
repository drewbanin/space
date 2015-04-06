function Asteroid(data) {
  this.orbit   = data.orbit;
  this.color   = data.color;
  this.mass    = data.mass
  this.radius  = data.radius
  this.offsetX = data.offsetX;
  this.offsetY = data.offsetY;
  this.pos = this.getPos(0);
  this.prevDeg = 0;
  this.velocity = (this.mass * this.orbit.around.mass) / (this.orbit.radius * this.orbit.radius) * 2;
}

Asteroid.prototype.getPos = function(tick) {
  deg = tick * (Math.PI / 180) * this.velocity;
  if (Math.cos(this.prevDeg) <= 0 && Math.cos(deg) > 0) {
    this.playSound(tick);
  }
  this.prevDeg = deg;
  var offset_x = Math.cos(deg) * this.orbit.radius + this.offsetX;
  var offset_y = Math.sin(deg) * this.orbit.radius + this.offsetY;
  return {
    x: this.orbit.around.pos.x + offset_x,
    y: this.orbit.around.pos.y + offset_y
  }
};

Asteroid.prototype.playSound = function(tick) {
  var freq = (990 - this.freq);
  var sine1 = T("sin", {freq: freq, mul:.05});
  var fadeout = Math.pow(this.freq / 110, 2) * 100;
  T("perc", {r:fadeout+"ms"}, sine1).on("ended", function() {
    this.pause();
  }).bang().play();
};

Asteroid.prototype.draw = function(ctx, tick) {
  this.pos = this.getPos(tick);
  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

