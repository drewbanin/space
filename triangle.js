function Triangle(pos, width, height, mass, color){
  this.pos    = pos;
  this.width  = width;
  this.height = height;
  this.mass = mass;
  this.color  = color;
};

Triangle.prototype.draw = function(ctx, tick){
  var top          = {x: this.pos.x, y: this.pos.y - (this.height / 2)};
  var bottom_left  = {x: this.pos.x - (this.width / 2), y: this.pos.y + this.height / 2};
  var bottom_right = {x: this.pos.x + (this.width / 2), y: this.pos.y + this.height / 2};

  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.moveTo(bottom_left.x,  bottom_left.y);
  ctx.lineTo(bottom_right.x, bottom_right.y);
  ctx.lineTo(top.x,          top.y);
  ctx.closePath();

  ctx.fill();
};

