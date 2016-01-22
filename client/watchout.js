var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select('body')
    .append('svg').attr({'width': width, 'height': height})
    .append('g').attr('class', 'enemies');

var createEnemies = function(numEnemies) {
  var result = [];
  var x;
  var y;

  for (var i = 0; i < numEnemies; i++) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    result.push([x,y]);
  }
  return result;
};

var update = function(data) {
  var enemies = svg.selectAll('circle')
    .data(data, function(d) { return d; });

  enemies.transition().duration(1000);

  enemies.enter().append('circle');

  enemies.attr({
    'class' : 'enemy',
    'r'     : Math.floor(width / 40),
    'cx'    : function(d) { return d[0]; },
    'cy'    : function(d) { return d[1]; },
    'fill'  : 'coral'
  });
  
  enemies.exit().remove();
};

setInterval(function() {
  var dataset = createEnemies(30);
  update(dataset);
}, 1500);