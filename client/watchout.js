var width = window.innerWidth;
var height = window.innerHeight;
var color = d3.scale.category20c();

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
    result.push({x: x, y: y});
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
      'fill'  : function(d,i) { return color(i); }
    });

  enemySelection.transition().duration(2000)
    .tween('custom', detectCollision)
    .attr({
      'cx' : function(d) { return d.x; },
      'cy' : function(d) { return d.y; }
    });

  enemySelection.exit().remove();
};

var Player = function() {
  this.r = 5;
  this.x = width * 0.5;
  this.y = height * 0.5;
  this.angle = 0;
};

Player.prototype.path = 'm-7.5,1.62413c0,-5.04095 4.08318,-9.12413 9.12414,-9.12413c5.04096,0 9.70345,5.53145 11.87586,9.12413c-2.02759,2.72372 -6.8349,9.12415 -11.87586,9.12415c-5.04096,0 -9.12414,-4.08318 -9.12414,-9.12415z';

var dataset = createEnemies(15);
update(dataset);

var newPlayer = new Player();

svg.append('path').attr({
  'id' : 'player',
  'd' : newPlayer.path,
  'fill' : '#111',
  'stroke' : 'coral',
  'stroke-width' : '5',
  'stroke-opacity' : '0.8',
  'transform' : 'translate(' + newPlayer.x + ',' + newPlayer.y + ') scale(2)'
});

setInterval(function() {
  dataset = createEnemies(15);
  update(dataset);
}, 5000);

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

  }
});

drag.on('drag', function() {
  var e = window.event;
  var x = e.clientX;
  var y = e.clientY;
  var a = newPlayer.angle;
  var radians = Math.atan2(x - (x + 18), y - (y + 18));
  var degree = (radians * (180 / Math.PI) * -1) + 90;
  degree = 0;

  newPlayer.x = x;
  newPlayer.y = y;
  myPlayer.attr('transform', 'translate(' + x + ',' + y + ') scale(2) rotate(' + degree + ')');
  enemies.selectAll('circle').attr('custom', detectCollision);
});

var checkCollision = function(enemy) {
  return enemy.each(function() {
    var radiusSum = parseFloat(enemy.attr('r')) + newPlayer.r;
    var xDiff = parseFloat(enemy.attr('cx')) - newPlayer.x;
    var yDiff = parseFloat(enemy.attr('cy')) - newPlayer.y;
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum) {
      console.log('AHHH!');
    }
  });
};

var detectCollision = function(d) {
  var enemy = d3.select(this);

  var startPos = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };

  var endPos = {
    x: d.x,
    y: d.y
  };
  
  return function(t) {
    var enemyNextPos;
    checkCollision(enemy);
    enemyNextPos = {
      x: startPos.x + (endPos.x - startPos.x) * t,
      y: startPos.y + (endPos.y - startPos.y) * t
    };
    return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
  };
};