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

var Player = function() {};

Player.prototype.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';

var dataset = createEnemies(15);
update(dataset);

var newPlayer = new Player();

var start = (width * 0.5) + ',' + (height * 0.5);

svg.append('path').attr({
  'id' : 'player',
  'd' : newPlayer.path,
  'fill' : '#111',
  'stroke' : 'coral',
  'stroke-width' : '5',
  'stroke-opacity' : '0.8',
  'transform' : 'translate(' + start + ') scale(2)'
});

setInterval(function() {
  dataset = createEnemies(15);
  update(dataset);
}, 2500);

var drag = d3.behavior.drag();
var myPlayer = d3.select('#player');

myPlayer.call(drag);

d3.select('body').on('keydown', function(event) {
  var key = d3.event.keyCode;
  // SPACE : 32
  // LEFT  : 37
  // UP    : 38
  // RIGHT : 39
  // DOWN  : 40
  // A     : 65
  // B     : 66

  if (key === 32 || (key >= 37 && key <= 40) || key === 65 || key === 66) {
    console.log('HIT!');
  }
});

drag.on('drag', function() {
  var e = window.event;
  var x = e.clientX;
  var y = e.clientY;

  myPlayer.attr('transform', 'translate(' + x + ',' + y + ') scale(2)');
});

