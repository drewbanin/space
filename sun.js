function Sun(pos, width, height, mass, velocity, color){
  this.pos    = pos;
  this.width  = width;
  this.height = height;
  this.mass = mass;
  this.velocity = velocity;
  this.color  = color;
  this.deg = 0;
  this.prevDeg = this.deg;
};

Sun.prototype.justPassed = function(bodyDegrees) {
  var prev = Math.abs(this.prevDeg % 360)
  var cur  = Math.abs(this.deg % 360)
  var body = Math.abs(bodyDegrees % 360)
  console.log(prev, cur, body);
  return (prev < body) && (cur >= body);
};

Sun.prototype.draw = function(ctx, tick){
  var top          = {x: this.pos.x, y: this.pos.y - (this.height / 2)};
  var bottom_left  = {x: this.pos.x - (this.width / 2), y: this.pos.y + this.height / 2};
  var bottom_right = {x: this.pos.x + (this.width / 2), y: this.pos.y + this.height / 2};
  //var right    = {x: this.pos.x + (this.width / 2), y: this.pos.y};
  //var top_left = {x: this.pos.x - (this.width / 2), y: this.pos.y - this.height / 2};
  //var bot_left = {x: this.pos.x - (this.width / 2), y: this.pos.y + this.height / 2};

  ctx.save();

  //var rad = (tick * this.velocity) % (2 * Math.PI);
  var rad = 0;
  this.prevDeg = this.deg;
  this.deg = rad * (180 / Math.PI);


  ctx.translate(this.pos.x, this.pos.y);
  ctx.rotate(rad);

  ctx.fillStyle = this.color;

  //ctx.beginPath();
  //var from = {x: top.x - this.pos.x, y : top.y - this.pos.y};
  //var to   = {x: 0, y: -600};
  //ctx.moveTo(from.x, from.y);
  //ctx.lineTo(to.x, to.y);
  //ctx.stroke();
  //ctx.dashedLine(right.x, right.y, 1200, right.y, 4);
  var line_size = 500;
  var line_dash_size = 20;

  var old_style = ctx.strokeStyle;
  ctx.dashedLine(top.x - this.pos.x, -line_size, 0, line_size, line_dash_size);
  ctx.dashedLine(-line_size, 0, line_size, 0, line_dash_size);
  ctx.strokeStyle = "rgba(255,255,255,.3)";
  ctx.stroke();
  ctx.strokeStyle = old_style;

  ctx.beginPath();
  ctx.moveTo(-this.pos.x + bottom_left.x,  -this.pos.y + bottom_left.y);
  ctx.lineTo(-this.pos.x + bottom_right.x, -this.pos.y + bottom_right.y);
  ctx.lineTo(-this.pos.x + top.x,          -this.pos.y + top.y);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

