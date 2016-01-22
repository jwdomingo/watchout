var width = window.innerWidth;
var height = window.innerHeight;
var color = d3.scale.category20c()

var svg = d3.select('body')
  .append('svg').attr({'width': width, 'height': height});

var enemies = svg.append('g').attr('class', 'enemies');

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
  var enemySelection = enemies.selectAll('circle')
    .data(data);

  enemySelection.enter()
    .append('circle').attr({
      'class' : 'enemy',
      'r'     : Math.floor(width / 50),
      'fill'  : color
    });

  enemySelection.transition().duration(1000).attr({
    'cx' : function(d) { return d[0]; },
    'cy' : function(d) { return d[1]; }
  });

  enemySelection.exit().remove();
};

var dataset = createEnemies(15);
update(dataset);

setInterval(function() {
  dataset = createEnemies(15);
  update(dataset);
}, 2500);
