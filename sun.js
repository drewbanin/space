function Sun(pos, width, height, mass, velocity, color, canvas, screen_size){
  this.pos    = pos;
  this.width  = width;
  this.height = height;
  this.mass = mass;
  this.velocity = velocity;
  this.color  = color;
  this.deg = 0;
  this.prevDeg = this.deg;
  this.canvas = canvas;
  this.screen_size = screen_size;

  this.mouse_angle = 0;

  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    var mouse_pos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    this.handleMouseMove(mouse_pos);
  }.bind(this), false);
};

Sun.prototype.handleMouseMove = function(pos) {
  var dx = pos.x - (this.screen_size.w / 2);
  var dy = pos.y - (this.screen_size.h / 2);

  var ratio = dy / dx;

  var angle_rad = dx != 0 ? Math.atan(ratio) : 0;

  // not defined when vertical, it makes the eye hop around!
  var is_vertical = dx < 2 && dx > -2;

  if (!isNaN(angle_rad) && !is_vertical) {
    var flip_factor = dx < 0 ? Math.PI : 0;
    this.mouse_angle = angle_rad + flip_factor;
  }
};

Sun.prototype.justPassed = function(bodyDegrees) {
  var prev = Math.abs(this.prevDeg % 360)
  var cur  = Math.abs(this.deg % 360)
  var body = Math.abs(bodyDegrees % 360)
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

  // sun triangle thing
  ctx.beginPath();
  ctx.moveTo(-this.pos.x + bottom_left.x,  -this.pos.y + bottom_left.y);
  ctx.lineTo(-this.pos.x + bottom_right.x, -this.pos.y + bottom_right.y);
  ctx.lineTo(-this.pos.x + top.x,          -this.pos.y + top.y);
  ctx.closePath();
  ctx.fill();

  // eye
  ctx.strokeStyle = "rgba(0,0,0,1)";
  ctx.fillStyle = "rgba(255,255,255,1)";
  ctx.beginPath()

  // top half eye
  
  var eye = {
    w: 20,
    h: 8,
    x: -10, // leftmost point of the oval
    y: 5,   // leftmost point of the oval
  };

  var tl_bez = {x: eye.x, y: eye.y - eye.h};
  var tr_bez = {x: eye.x + eye.w, y: eye.y - eye.h};

  var bl_bez = {x: eye.x, y: eye.y + eye.h};
  var br_bez = {x: eye.x + eye.w, y: eye.y + eye.h};

  ctx.moveTo(eye.x, eye.y);
  ctx.bezierCurveTo(tl_bez.x, tl_bez.y, tr_bez.x, tr_bez.y, eye.x + eye.w, eye.y);

  // bottom half eye
  ctx.moveTo(eye.x, eye.y);
  ctx.bezierCurveTo(bl_bez.x, bl_bez.y, br_bez.x, br_bez.y, eye.x + eye.w, eye.y);
  ctx.stroke();
  ctx.fill();

  // pupil
  ctx.fillStyle = '#000';
  ctx.beginPath()

  var pupil_radius = 3; // radius for it to rotate around
  var pupil = {
    x: pupil_radius * Math.cos(this.mouse_angle) * 1.5, // make it more oblong
    y: pupil_radius * Math.sin(this.mouse_angle) + 5,   // translate it down
    r: 2,
  }
  ctx.arc(pupil.x, pupil.y, pupil.r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.closePath();
  ctx.stroke();
  ctx.fill();


  ctx.restore();
};

