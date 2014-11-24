function SolarSystem(sun, ctx, dimensions) {
  this.bodies  = [];
  this.tick = 0;
  this.sun = sun;
  this.ctx = ctx;
  this.dimensions = dimensions;
  this.frameRate = 33;
}

SolarSystem.prototype.addBody = function(planet) {
  this.bodies.push(planet);
};

SolarSystem.prototype.draw = function(ctx, tick) {
  this.sun.draw(ctx, tick);
  _.each(this.bodies, function(planet) {
    planet.draw(ctx, tick);
  }.bind(this));
};

SolarSystem.prototype.step = function() {
  this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
  this.draw(this.ctx, this.tick);
  this.tick += 1;
};

SolarSystem.prototype.letThereBeLight = function() {
  setInterval(this.step.bind(this), 1000 / this.frameRate);
};
