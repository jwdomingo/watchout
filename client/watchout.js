var width = window.innerWidth;
var height = window.innerHeight;
var color = d3.scale.category20c();

var svg = d3.select('body')
  .append('svg').attr({'width': width, 'height': height});

var enemies = svg.append('g').attr('class', 'enemies');

var spaceship = svg.append('g').attr({
  'id' : 'spaceship',
  'stroke' : 'none',
  'stroke-width' : 1,
  'fill' : 'none',
  'fill-rule' : 'evenodd'
}).append('g').attr({
  'transform': 'translate(0.000000, 1.000000)'
});

spaceship.append('path').attr({
  'd' : 'M147 62.6C147 55.3 133.4 48.8 113.2 45 113.1 45.1 113 45.3 112.8 45.4 100.4 50.7 87.2 53.5 73.7 53.5 60.1 53.5 47 50.7 34.6 45.4 34.4 45.3 34.3 45.1 34.2 45 14 48.8 0.4 55.3 0.4 62.6 0.4 68.5 9.3 73.9 23.3 77.8 23.2 78 23.1 78.3 23 78.6 22.9 78.9 22.9 79.1 22.9 79.4 22.9 79.5 22.9 79.5 22.9 79.5 23 81.7 24.8 83.5 27 83.5 28.5 83.5 29.8 82.6 30.5 81.4 30.7 81.1 30.8 80.8 30.9 80.5 30.9 80.2 31 79.9 31 79.6 39.8 81.5 49.9 82.8 60.8 83.4 65 83.6 69.3 83.7 73.7 83.7 77.9 83.7 82 83.6 86 83.4 97.1 82.8 107.5 81.5 116.4 79.6 116.4 79.9 116.4 80.2 116.5 80.5 116.6 80.8 116.7 81.1 116.8 81.4 117.5 82.6 118.9 83.5 120.4 83.5 122.6 83.5 124.4 81.7 124.4 79.5 124.4 79.5 124.5 79.5 124.5 79.4 124.5 79.1 124.4 78.9 124.4 78.6 124.3 78.3 124.2 78 124.1 77.8 138.1 73.9 147 68.5 147 62.6',
  'fill' : '#ED2288'
});

spaceship.append('g').attr({
  'transform' : 'translate(13.000000, 58.000000)',
  'stroke' : '#FFFFFF',
  'stroke-width' : '2',
  'fill' : '#5DC0ED'
}).append('path').attr({
  'd' : 'M4.4 0.3C2.1 0.3 0.3 2.1 0.3 4.4 0.3 6.7 2.1 8.5 4.4 8.5 6.7 8.5 8.5 6.7 8.5 4.4 8.5 2.1 6.7 0.3 4.4 0.3M41.9 6.5C39.7 6.5 37.8 8.4 37.8 10.7 37.8 12.9 39.7 14.8 41.9 14.8 44.2 14.8 46 12.9 46 10.7 46 8.4 44.2 6.5 41.9 6.5M79.4 6.5C77.2 6.5 75.3 8.4 75.3 10.7 75.3 12.9 77.2 14.8 79.4 14.8 81.7 14.8 83.6 12.9 83.6 10.7 83.6 8.4 81.7 6.5 79.4 6.5M117 0.3C114.7 0.3 112.8 2.1 112.8 4.4 112.8 6.7 114.7 8.5 117 8.5 119.2 8.5 121.1 6.7 121.1 4.4 121.1 2.1 119.2 0.3 117 0.3'
});

spaceship.append('path').attr({
  'd' : 'M99.4 10.8L100 10.2 100.6 9.6 102.3 7.8C103.3 6.8 103.3 5.2 102.3 4.2 101.4 3.2 99.8 3.2 98.8 4.2L96.6 6.4 96 7 95.4 7.6C89.2 3.4 81.7 0.9 73.7 0.9 65.6 0.9 58.2 3.4 52 7.6L51.4 7 50.8 6.4 48.6 4.2C47.6 3.2 46 3.2 45 4.2 44 5.2 44 6.8 45 7.8L46.8 9.6 47.4 10.2 48 10.8C40.2 17.8 35.2 28 35.2 39.4 35.2 40.7 35.3 42 35.5 43.4 35.6 43.7 35.6 44 35.6 44.3 35.7 44.3 35.7 44.4 35.7 44.4 36.1 44.6 36.5 44.8 36.9 44.9 48.6 49.7 61 52.2 73.7 52.2 86.4 52.2 98.8 49.7 110.4 44.9 110.9 44.8 111.3 44.6 111.7 44.4 111.7 44.4 111.7 44.3 111.7 44.3 111.8 44 111.8 43.7 111.8 43.4 112 42 112.1 40.7 112.1 39.4 112.1 28 107.2 17.8 99.4 10.8',
  'stroke' : '#5DC0ED',
  'stroke-width' : '3',
  'stroke-linecap' : 'round',
  'stroke-linejoin' : 'round',
  'fill-opacity' : '0.3',
  'fill' : '#5DC0ED'
});

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
  var enemySelection = enemies.selectAll('use')
    .data(data);

  enemySelection.enter()
    .append('use').attr({
      'class' : 'enemy',
      'xlink:href' : '#spaceship',
      'transform' : 'scale(0.8)'
    });

  enemySelection.transition().duration(2500)
    .tween('custom', detectCollision)
    .attr({
      'x' : function(d) { return d.x; },
      'y' : function(d) { return d.y; }
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
    console.log('--------------->',newPlayer.angle);
    console.log('x:', newPlayer.x);
    console.log('y:', newPlayer.y);
    console.log('xNew:',Math.cos(newPlayer.angle));
    console.log('yOld:',Math.sin(newPlayer.angle));

    svg.append('circle').attr({
      'class' : 'laser',
      'r'     : 2,
      'fill'  : 'black',
      'cx'    : newPlayer.x,
      'cy'    : newPlayer.y
    })
    .transition().attr({
      'cx'    : newPlayer.x + (Math.cos(newPlayer.angle) * 200),
      'cy'    : newPlayer.y + (Math.sin(newPlayer.angle) * 200)
    });
  }
});

drag.on('drag', function() {
  var e = window.event;
  var x = e.clientX;
  var y = e.clientY;
  var radians = Math.atan2(d3.event.dx, d3.event.dy);
  var degree = (radians * (180 / Math.PI) * -1) + 90;

  newPlayer.x = x;
  newPlayer.y = y;
  newPlayer.angle = degree;
  myPlayer.attr('transform', 'translate(' + x + ',' + y + ') scale(2) rotate(' + degree + ')').transition();
});

var checkCollision = function(enemy) {
  return enemy.each(function() {
    //console.log('width', enemy.node().getBBox().);
    var stats = enemy.node().getBBox();
    var radiusSum = Math.floor((stats.height + stats.width) / 2);
    var xDiff = parseFloat(enemy.attr('x')) - newPlayer.x;
    var yDiff = parseFloat(enemy.attr('y')) - newPlayer.y;
    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    if (separation < radiusSum) {
      console.log('AHHH!');
    }
  });
};

var detectCollision = function(d) {
  var enemy = d3.select(this);

  var startPos = {
    x: parseFloat(enemy.attr('x')),
    y: parseFloat(enemy.attr('y'))
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
    return enemy.attr('x', enemyNextPos.x).attr('y', enemyNextPos.y);
  };
};