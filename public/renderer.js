function Renderer(field, templates, tree, after) {
  var
    $templates = $(templates),
    $field = $(field),
    rpos = 0,
    rframe = false,
    tree = new Tree(tree),
    sprites = [];
    

  function addObject(obj) {
    var $s = $('<div class="sprite"><div class="label">' + obj.id + '</div></div>').appendTo($field);
    var $b = $templates.children('.' + obj.type).clone().addClass(obj.class).prependTo($s);
    return sprites[obj.id] = {s1: $s[0].style, s2: $b[0].style, data: $s[0].dataset};
  }

  function renderSprite(obj) {
    o = sprites[obj.id];
    if (o === undefined)
      o = addObject(obj);

    o.s1.left = obj.x + 'px';
    o.s1.top = obj.y + 'px';
    o.s2.webkitTransform = 'rotate(' + obj.a + 'deg)';
    o.data.info = obj.info;
  }

  function renderFrameFast(frame, pos) {
    rframe = frame;
    rpos = pos;
    spr = frame.sprites;
    for (var i = 0; i < spr.length; ++i) {
      renderSprite(spr[i]);
    }
    after(pos);
  }

  function renderFrame(frame, pos) {
    renderFrameFast(frame, pos);
    tree.set(frame.info);
  }

  this.render = renderFrame;

  this.fast = function(fast) {
    this.render = fast ? renderFrameFast : renderFrame;
    if (!fast)
      this.render(rframe, rpos);
  }

  this.clear = function() {
    $field.empty();
    this.render = renderFrame;
  }
}
