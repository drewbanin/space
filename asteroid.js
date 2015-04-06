function Asteroid(data) {
  this.orbit   = data.orbit;
  this.color   = data.color;
  this.mass    = data.mass
  this.radius  = data.radius
  this.offsetX = data.offsetX;
  this.offsetY = data.offsetY;
  this.pos = this.getPos(0);
  this.tickOffset = Math.floor(Math.random() * 1000);
  this.prevDeg = 0;
  this.velocity = (this.mass * this.orbit.around.mass) / (this.orbit.radius * this.orbit.radius) * 2;
}

Asteroid.prototype.getPos = function(actual_tick) {
  var tick = actual_tick + this.tickOffset;
  deg = tick * (Math.PI / 180) * this.velocity;
  this.prevDeg = deg;
  var offset_x = Math.cos(deg) * this.orbit.radius + this.offsetX;
  var offset_y = Math.sin(deg) * this.orbit.radius + this.offsetY;
  return {
    x: this.orbit.around.pos.x + offset_x,
    y: this.orbit.around.pos.y + offset_y
  }
};

Asteroid.prototype.draw = function(ctx, tick) {
  this.pos = this.getPos(tick);
  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

