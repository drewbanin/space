function AsteroidBelt(data) {
  this.orbit = data.orbit;
  this.color = data.color;
  this.count = data.count;
  this.maxOffset = data.maxOffset;
  this.asteroids = [];
  _.each(_.range(this.count), function(i) {
    if (i > 0 && Math.random() < .1) {
      var orbit = {
        around: this.asteroids[this.asteroids.length-1],
        radius: Math.random() * 10 + 10,
      };
      var mass = 5;
    } else {
      var orbit = this.orbit;
      var mass = Math.random() * 200 - 100;
      mass = Math.abs(mass) < 5 ? 5 + Math.random() * 10 : mass;
    }
    var asteroid = new Asteroid({
      orbit: orbit,
      color: this.color,
      mass: mass,
      offsetX: Math.random() * this.maxOffset,
      offsetY: Math.random() * this.maxOffset,
      radius: Math.random() * 2 + .05,
    });
    this.asteroids.push(asteroid);
  }.bind(this));
};

AsteroidBelt.prototype.draw = function(ctx, tick) {
  _.each(this.asteroids, function(asteroid) {
    asteroid.draw(ctx, tick);
  }.bind(this));
};
