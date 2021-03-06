
//var NOTE_FREQS = {
//};

var NOTE_FREQS = {
  'a_flat' : 207.65,
  'c' : 261.6,
  'e_flat' : 311.13,
  'e' : 329.6,
  'f_sharp' : 369.99,
  'g' : 391.9,
  'b_flat' : 466.1,
  'd' : 783.99,
};

/// cool
//var planet_freqs = ['c', 'e', 'g', 'b_flat', 'd']

// cooler?
//var planet_freqs = ['a_flat', 'c', 'e_flat', 'f_sharp']

// the coolest!!!
var planet_freqs = ['c', 'e', 'g', 'b_flat', 'd', 'a_flat', 'e_flat', 'f_sharp'];

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

  this.originalColor = data.color;
  this.ticksTillSilent = 0;
  this.maxTicksTillSilent = 1;
}

Planet.prototype.justPassed = function(bodyDegrees) {
  return false;
};

Planet.prototype.distanceFrom = function(point) {
  var dx = point.x - this.pos.x;
  var dy = point.y - this.pos.y;
  return Math.sqrt(dx * dx + dy * dy);
};

Planet.prototype.handlePlaySound = function(tick, factor) {
  var stats = this.playSound(tick, factor);
  
  if (stats.playing) {
    this.ticksTillSilent = stats.fadeout;
    this.maxTicksTillSilent = stats.fadeout;
  };
};

Planet.prototype.setColor = function() {
  if (this.ticksTillSilent <= 0) {
    this.color = this.originalColor;
    this.ticksTillSilent = 0;
  } else {
    var whiteness = Math.min(1, this.ticksTillSilent / this.maxTicksTillSilent);
    this.color = shadeBlend(whiteness, this.originalColor);
  }
}

Planet.prototype.playSound = function(tick, factor) {
  if (MUTE) {
    return {
      playing: false,
      fadeout: 0,
    }
  } else if (this.isMoon) {
    return {
      playing: false,
      fadeout: 0,
    }
  } else {
    var multiplier = 1 / (this.number * factor);
    var note = planet_freqs[this.number % planet_freqs.length];
    //var sine1 = T("sin", {freq: NOTE_FREQS[note] * multiplier, mul:0.05});
    var freq = NOTE_FREQS[note] * multiplier;
    freq = freq < 50 ? NOTE_FREQS[note] : freq;
    var sine1 = T("sin", {freq: freq, mul:0.1});
    var fadeout = ((1 + this.number) * (1 + this.number)) * 100;
    T("perc", {r:fadeout+"ms"}, sine1).on("ended", function() {
      this.pause();
    }).bang().play();
    return {
      playing: true,
      fadeout: fadeout,
    }
  }
};

Planet.prototype.getPos = function(tick) {
  //deg = (tick * (Math.PI / 180) * this.velocity) % (2 * Math.PI);
  //deg = (tick * (Math.PI / 180) * Math.pow(2, 8 - this.number) / 2) % (2 * Math.PI);
  deg = (tick * (Math.PI / 180) * Math.pow(2, 7 - this.number) / 2) % (2 * Math.PI);

  if (Math.cos(this.prevDeg) <= 0 && Math.cos(deg) > 0) {
    this.handlePlaySound(tick, 1);
  } else if (Math.cos(this.prevDeg) > 0 && Math.cos(deg) <= 0) {
    this.handlePlaySound(tick, 2);
  }

  if (Math.sin(this.prevDeg) <= 0 && Math.sin(deg) > 0) {
    this.handlePlaySound(tick, 3);
  } else if (Math.sin(this.prevDeg) > 0 && Math.sin(deg) <= 0) {
    this.handlePlaySound(tick, 4);
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

  if (!this.isMoon) {
    var old_style = ctx.strokeStyle;
    ctx.beginPath()
    ctx.arc(this.orbit.around.pos.x, this.orbit.around.pos.y, this.orbit.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255,.2)";
    ctx.stroke();
    ctx.closePath();
    ctx.strokeStyle = old_style;
  }

  this.setColor();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = shadeBlend(-.5, this.color);

  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
  ctx.closePath();
  var old_width = ctx.lineWidth;
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fill();
  ctx.lineWidth = old_width;

  if (this.ticksTillSilent > 20) {
    this.ticksTillSilent -= 20;
  } else {
    this.ticksTillSilent = 0;
  }
};
