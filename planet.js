function Planet(data) {
  this.name     = data.name;
  this.orbit    = data.orbit;
  this.radius   = data.radius;
  this.mass     = data.mass;
  this.color    = data.color;
  this.velocity = (this.mass * this.orbit.around.mass) / (this.orbit.radius * this.orbit.radius);
  this.pos      = this.getPos(0);
  this.prevDeg  = 0;
}

Planet.prototype.distanceFrom = function(point) {
  var dx = point.x - this.pos.x;
  var dy = point.y - this.pos.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Planet.prototype.playSound = function(tick) {
  console.log('playing sound -- ' + this.name);
};

Planet.prototype.getPos = function(tick) {
  deg = (tick * (Math.PI / 180) * this.velocity) % (2 * Math.PI);
  if (Math.sin(this.prevDeg) <= 0 && Math.sin(deg) > 0) {
    this.playSound();
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
