function SolarSystem(sun, ctx, dimensions) {
  this.bodies  = [];
  this.statics = [];
  this.tick = 0;
  this.sun = sun;
  this.ctx = ctx;
  this.dimensions = dimensions;
  this.frameRate = 66;
}

SolarSystem.prototype.addBody = function(planet) {
  this.bodies.push(planet);
};

SolarSystem.prototype.addStatic = function(static) {
  this.statics.push(static);
};

SolarSystem.prototype.draw = function(ctx, tick) {
  this.sun.draw(ctx, tick);
  _.each(this.bodies, function(planet) {
    planet.draw(ctx, tick);
  }.bind(this));

  _.each(this.statics, function(static) {
    static.draw(ctx, tick);
  }.bind(this));
};

SolarSystem.prototype.step = function() {
  this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  this.draw(this.ctx, this.tick);
  this.tick += .1;
};

SolarSystem.prototype.letThereBeLight = function() {
  setInterval(this.step.bind(this), 1000 / this.frameRate);
};
