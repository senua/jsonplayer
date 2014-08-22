$(function() {
  window.rend = new Renderer('#field', '#templates', '#tree',
    (function(slider, text, pos) {
      slider.slider('value', pos);
      text.val(pos);
    }).bind(null, $('#frame-sld'), $('#frame-inp')));

  window.player = new Player(rend, []);

  function setFrames(json) {
    window.frames = json;
    player.setFrames(json);
    $('#frame-sld').slider('option', 'max', frames.length);
  }

  function loadJson(url) {
  }

/* field */
  $('#field')
  .mousemove(function(e) {
    var o = $(this).offset();
    $('#coords').text('coords: ' + (e.pageX - o.left) + ' ' + (e.pageY - o.top));
  })
  .mouseleave(function(e) {
    $('#coords').text('');
  })
  .on('mouseenter', '.sprite', function(e) {
    $('#info').text($(e.currentTarget).data('info'));
  })
  .on('mouseleave', '.sprite', function(e) {
    $('#info').text('');
  });

/* controls */
  $('#play-btn').button({icons: {primary: 'ui-icon-play'}, text: false, label: '_'})
    .change(function() {
      $(this).button('option', 'icons', {primary: (this.checked ? 'ui-icon-pause' : 'ui-icon-play')});
      if (this.checked) {
        rend.fast(true);
        player.play();
      }
      else {
        player.stop();
        rend.fast(false);
      }
    }).next().attr('title', '');

  $('#prev-btn').click(function() {player.prev()});
  $('#next-btn').click(function() {player.next()});

  $('#upd-btn').button({icons: {primary: 'ui-icon-arrowrefresh-1-w'}, text: false})
    .click(function() {
      $.getJSON(new Date().getTime() + '/log.json', setFrames);
    }).click();


  $('#btns').buttonset({items: "button, input"});
  
  $('#frame-sld').slider({
    min:0,
    max:frames.length - 1,
    change: function(e, ui) {
      if (e.originalEvent)
        player.setPos(ui.value);
    },
    slide: function(e, ui) {
      player.setPos(ui.value);
    },
    start: function(e, ui) {
      rend.fast(true);
    },
    stop: function(e, ui) {
      rend.fast(false);
    }
  });

  $('#speed-sld').slider({
    min:0.5,
    value: 1,
    max:10,
    step: 0.01,
    change: function(e, ui) {
      player.setSpeed(ui.value);
    }
  });

  $('#frame-inp')
    .change(function() {
      player.setPos($(this).val());
    })
    .click(function() {
      $(this).select();
    });

/* shortcuts */
  $(document).keydown(function(e) {
    if (e.target.id == 'frame-inp' || e.target.id == 'play-btn')
      return;
    switch (e.which) {
      case 32: $('#play-btn').click(); break;
      case 37: rend.fast(true); player.prev(); break;
      case 39: rend.fast(true); player.next(); break;
    };
  }).keyup(function(e) {
    if (e.target.id == 'frame-inp' || e.target.id == 'play-btn')
      return;
    switch (e.which) {
      case 37: 
      case 39: rend.fast(false); break;
    }
  });


/* init */
  setFrames(frames);

});
