function draw() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");



  ctx.beginPath();
  ctx.arc(75, 75, 10, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

  var score = 4;
function drawIt() {
  var x = 150;
  var y = 250;
  var dx = 2;
  var dy = 4;
  var WIDTH;
  var HEIGHT;
  var r = 10;
  var ctx;
  var tocke;
  var sekunde;
  var sekundeI;
  var minuteI;
  var intTimer;
  var izpisTimer;
  var start = true;
  var intervalId = init();

  function timer() {
      if (start == true) {
          sekunde++;
          sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
          minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
          izpisTimer = minuteI + ":" + sekundeI;
          $("#cas").html(izpisTimer);
      }
      else {
          sekunde = 0;
          //izpisTimer = "00:00";
          $("#cas").html(izpisTimer);
      }
  }
  function init() {
      sekunde = 0;
      izpisTimer = "00:00";
      intTimer = setInterval(timer, 1000);
      tocke = 0;
      $("#tocke").html(tocke);
      ctx = $('#canvas')[0].getContext("2d");
      WIDTH = $("#canvas").width();
      HEIGHT = $("#canvas").height();
      return intervalId = setInterval(draw, 10);

  }

  function circle(x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = "#7d9ab3";
      ctx.fill();
  }

  function rect(x, y, w, h) {
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
  }

  function clear() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  //END LIBRARY CODE
  function draw() {
      clear();
      circle(x, y, 10);
      x += dx;
      y += dy;
  }
  function draw() {

      clear();

      circle(x, y, 10);

      if (x + dx > WIDTH - r || x + dx < 0 + r)

          dx = -dx;

      if (y + dy > HEIGHT - r || y + dy < 0 + r)

          dy = -dy;

      x += dx;

      y += dy;

  }


  var paddlex;
  var paddleh;
  var paddlew;


  function init_paddle() {
      paddlex = WIDTH / 2;
      paddleh = 10;
      paddlew = 75;
  }

  function draw() {
      clear();
      circle(x, y, 10);
      rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
      if (x + dx > WIDTH - r || x + dx < 0 + r)
          dx = -dx;

      if (y + dy < 0 + r)
          dy = -dy;
      else if (y + dy > HEIGHT - r) {
          if (x > paddlex && x < paddlex + paddlew){
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
              dy = -dy;
          }
          else
              clearInterval(intervalId);
      }

      x += dx;
      y += dy;
  }
  init_paddle();
  var rightDown = false;
  var leftDown = false;

  //nastavljanje leve in desne tipke
  function onKeyDown(evt) {
      if (evt.keyCode == 39)
          rightDown = true;
      else if (evt.keyCode == 37) leftDown = true;
  }

  function onKeyUp(evt) {
      if (evt.keyCode == 39)
          rightDown = false;
      else if (evt.keyCode == 37) leftDown = false;
  }
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  function draw() {
      clear();
      circle(x, y, 10);
      //premik ploščice levo in desno
      if (rightDown) paddlex += 5;
      else if (leftDown) paddlex -= 5;
      rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
      if (x + dx > WIDTH - r || x + dx < 0 + r)
          dx = -dx;
      if (y + dy < 0 + r)
          dy = -dy;
      else if (y + dy > HEIGHT - r + r) {
          if (x > paddlex && x < paddlex + paddlew) {
              dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
              dy = -dy;
            }
          else if (y + dy > HEIGHT - r)
              clearInterval(intervalId);
      }
      x += dx;
      y += dy;
  }
  var canvasMinX;
  var canvasMaxX;

  function init_mouse() {
      //canvasMinX = $("#canvas").offset().left;
      canvasMinX = $("canvas").offset().left;
      canvasMaxX = canvasMinX + WIDTH;
  }

  function onMouseMove(evt) {
      if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
          paddlex = evt.pageX - canvasMinX;
      }
  }
  $(document).mousemove(onMouseMove);


  init_mouse();
  var bricks;
  var NROWS;
  var NCOLS;
  var BRICKWIDTH;
  var BRICKHEIGHT;
  var PADDING;

  function initbricks() { //inicializacija opek - polnjenje v tabelo
      NROWS = 5;
      NCOLS = 5;
      BRICKWIDTH = (WIDTH / NCOLS) - 1;
      BRICKHEIGHT = 30;
      PADDING = 2;
      bricks = new Array(NROWS);
      for (i = 0; i < NROWS; i++) {
          bricks[i] = new Array(NCOLS);
          for (j = 0; j < NCOLS; j++) {
              bricks[i][j] = 1;
          }
      }

  }
  
  initbricks();
  function draw() {
      clear();
      circle(x, y, 10);
      //premik ploščice levo in desno
      if(rightDown){
    if((paddlex+paddlew) < WIDTH){
    paddlex += 5;
    }else{
    paddlex = WIDTH-paddlew;
    }
    }
    else if(leftDown){
    if(paddlex>0){
    paddlex -=5;
    }else{
    paddlex=0;
    }
    }
    
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
    
    //riši opeke
      for (i=0; i < NROWS; i++) {
        for (j=0; j < NCOLS; j++) {
          if (bricks[i][j] == 1) {
            rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
          }
        }
      }
    
      if (x + dx > WIDTH -r || x + dx < 0+r)
        dx = -dx;
      if (y + dy < 0+r)
        dy = -dy;
      else if (y + dy > HEIGHT -r) {
          if (x > paddlex && x < paddlex + paddlew) {
              dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
              dy = -dy;
            }
        else if (y + dy > HEIGHT-r)
          clearInterval(intervalId);
      }
      x += dx;
      y += dy;
    }
    function draw() {
      clear();
      circle(x, y, 10);
      //premik ploščice levo in desno
      if(rightDown){
    if((paddlex+paddlew) < WIDTH){
    paddlex += 5;
    }else{
    paddlex = WIDTH-paddlew;
    }
    }
    else if(leftDown){
    if(paddlex>0){
    paddlex -=5;
    }else{
    paddlex=0;
    }
    }
    rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
    
    //riši opeke
      for (i=0; i < NROWS; i++) {
        for (j=0; j < NCOLS; j++) {
          if (bricks[i][j] == 1) {
            rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                (i * (BRICKHEIGHT + PADDING)) + PADDING,
                BRICKWIDTH, BRICKHEIGHT);
          }
        }
      }
    
      rowheight = BRICKHEIGHT + PADDING + r/2; //Smo zadeli opeko?
      colwidth = BRICKWIDTH + PADDING + r/2;
      row = Math.floor(y/rowheight);
      col = Math.floor(x/colwidth);
      //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy; bricks[row][col] = 0;
    }
      if (x + dx > WIDTH -r || x + dx < 0+r)
        dx = -dx;
      if (y + dy < 0+r)
        dy = -dy;
      else if (y + dy > HEIGHT -r) {
          if (x > paddlex && x < paddlex + paddlew) {
              dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
              dy = -dy;
            }
        else if (y + dy > HEIGHT-r){
          score--;
          console.log(score);
          if(!score){
            //window.close();
          }
          else{
            drawIt();
          }
          clearInterval(intervalId);
        }
      }
      x += dx;
      y += dy;
    }
}