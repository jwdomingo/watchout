d3.json('trump.json', function(error, data) {
  var text = data.speech;

  var minText;
  var chars = "!@#$^&%*()+=-[]/'{}|:<>?,.";
  for (var i = 0; i < chars.length; i++) {
      minText = text.replace(new RegExp("\\" + chars[i], 'gi'), '');
  }
  console.log(minText);
});