function Controller(ctx, canvas, size, planets) {
  this.row_size = {width: 150, height: 50};
  this.pos = {
    x: 50,
    y: 50,
    height: planets.length * this.row_size.height,
    width: this.row_size.width,
    offset: 2,
  }

  this.ctx = ctx;
  this.canvas = canvas;
  this.size = size;
  this.planets = planets;
}

Controller.prototype.drawPlanetRow = function(ctx, planet, index) {
  var prev_fill = ctx.fillStyle;

  var color = hexToRgb(planet.originalColor);
  var alpha = '.5';
  ctx.fillStyle = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + alpha + ')';

  var y_pos = this.pos.y + this.row_size.height * index + this.pos.offset * index + window.scrollY;
  ctx.fillRect(this.pos.x, y_pos, this.row_size.width, this.row_size.height);

  ctx.font = "small-caps bold 20px arial";
  ctx.fillStyle = '#FFF';
  ctx.fillText(planet.name,this.pos.x + 10, y_pos + 32);

  ctx.fillStyle = prev_fill;
};

Controller.prototype.draw = function(ctx, tick) {
  ctx.fillStyle = 'rgba(10, 10, 10, .5)';
  ctx.strokeStyle = 'rgba(20, 20, 20, .5)';

  // bounding box
  ctx.rect(this.pos.x, this.pos.y + window.scrollY, this.pos.width, this.pos.height + this.pos.offset * this.planets.length);
  ctx.stroke();
  ctx.fill();

  _.each(this.planets, function(planet, index) {
    this.drawPlanetRow(ctx, planet, index);
  }.bind(this));
};

