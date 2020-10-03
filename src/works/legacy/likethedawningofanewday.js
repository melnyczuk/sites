var w, h;
var $img = [];
var $text = [];
var copy = ['like the dawning', 'of a new day'];
var count;

//  ADD IMAGES BY SRC
function addImage(url) {
  $img[$img.length] = $('<img>')
    .attr('src', url)
    .attr('id', $img.length)
    .appendTo('body');
  imgCSS($img.length - 1);
}

//  ADD TEXT BY COPY (needs dev)
//  --add two banners of text top and bottom that appear when hovered;
function addText(textCopy) {
  $text[$text.length] = $('<span>')
    .attr('id', "'" + textCopy + "'")
    .text(textCopy)
    .appendTo('body');
  textCSS($text.length - 1);
}

//  CHANGE IMG CSS (POS)
function imgCSS(index) {
  $img[index].css({
    position: 'absolute',
    top: (h - $img[index].height()) / 2,
    left: (w - $img[index].width()) * ((index + 2) / ($img.length + 3)),
  });
}

//  CHANGE TEXT CSS (needs dev)
function textCSS(index) {
  $text[index].css({
    padding: w * 0.02,
    fontFamily: 'times new roman',
    fontSize: h * 0.1,
    letterSpacing: w * 0.001,
    color: '#000000',
    position: 'absolute',
    top: h * index - (h * index) / 5,
    left: w * 0.25,
    textAlign: 'center',
  });
}

//  AT INIT LOAD IMAGES
for (var i = 0; i < 3; i++) {
  addImage('bin/img' + i + '.jpg');
}

//for (var i = 0; i < 2; i++) {
//    addText(copy[i]);
//}

//  DOC READY
$(document).ready(function () {
  $('body').css('background-color', '#000000');
  resizeWindow();
  count = 0;
});

//  AT RESIZE
$(window).resize(
  (resizeWindow = function resizeWindow() {
    w = $(window).width();
    h = $(window).height();

    for (var i = 0; i < $img.length; i++) imgCSS(i);
    for (var i = 0; i < $text.length; i++) textCSS(i);
  })
);

// AT CLICK - IMAGE HIDES OR SHOWS IF HIDDEN
$(document).on('click', function (event) {
  event.preventDefault();
  count += 5;
  imgSwitch();
  //textRandom();
  $('body').css(
    'background-color',
    'rgb(' + count + ',' + count + ',' + count + ')'
  );
});

function textRandom() {
  for (var i = 0; i < $text.length; i++) {
    var ls =
      Math.floor(Math.random() * (w * 0.1)) +
      $text[i].css('letter-spacing').length;
    var lp =
      Math.floor(Math.random() * (w * 0.55)) + $text[i].css('left').length;
    console.log(lp);
    $text[i].css({
      letterSpacing: ls,
      left: lp,
    });
  }
}

function imgSwitch() {
  for (var i = 0; i < $img.length; i++) {
    if (event.target.id === $img[i].attr('id')) {
      $img[i].remove().hide().appendTo('body');
    } else $img[i].show();
    imgCSS(i);
  }
}
