var width = window.innerWidth;
var height = window.innerHeight;

var numEnemies = 30;

var dataset = [];
var x;
var y;

for (var i = 0; i < numEnemies; i++) {
  x = Math.floor(Math.random() * width);
  y = Math.floor(Math.random() * height);
  dataset.push([x,y]);
}

var svg = d3.select('body')
  .append('svg')
    .attr({'width': width, 'height': height});

var enemies = svg.append('g').attr('class', 'enemies')
  .selectAll('circle')
  .data(dataset, function(d) { return d; })
  .enter().append('circle');

enemies.attr({
  'class' : 'enemy',
  'r'     : Math.floor(width / 50),
  'cx'    : function(d) { return d[0]; },
  'cy'    : function(d) { return d[1]; },
  'fill'  : 'coral'
});