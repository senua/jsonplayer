function Player(renderer, frames) {
  var
    pos = 0,
    intervalId = 0,
    interval = 100,
    playing = false,
    speed = 1;
  

  var playFrame = (function() {
    if (pos < frames.length - 1)
      ++pos;
    else
      this.stop();

    renderer.render(frames[pos], pos);
  }).bind(this);

  this.render = function() {
    renderer.render(frames[pos], pos);
  }

  this.setFrames = function(newFrames) {
    if (playing)
      this.stop();

    renderer.clear();
    frames = newFrames;
    this.setPos(0);
    this.render();
  }

  this.play = function() {
    intervalId = setInterval(playFrame, interval / speed);
    playing = true;
  }

  this.stop = function() {
    clearInterval(intervalId);
    playing = false;
  }

  this.next = function() {
    this.setPos(pos + 1);
  }

  this.prev = function() {
    this.setPos(pos - 1);
  }

  this.setPos = function(newPos) {
    newPos = parseInt(newPos);

    if (newPos >= 0 && newPos < frames.length && newPos != pos) {
      pos = newPos;
      this.render();
    }
  }

  this.setSpeed = function(newSpeed) {
    speed = parseInt(newSpeed);
    if (playing) {
      this.stop();
      this.play();
    }
  }
}

