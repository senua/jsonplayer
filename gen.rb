require 'json'
res = [];

500.times do |i|
  spr = [];
  50.times do |id|
    spr << {id: id, type: 'player', class: 'pl' + (id % 4).to_s, a: id*5 + i*(1 + id/10.0), x: 5 + id*9, y: 100 + Math.cos((i + id*5)/30.0)*50, info: id}
  end
  res << {sprites: spr,  info: {a: {b:1, c:{a:[1,2,i,4]}}, b: 100} };
end

res[0][:sprites] << {id: 100, type: 'puck', x: 30, y: 30, info: 100};
res[0][:sprites]  << {id: 101, type: 'cage', x: 70, y: 30, info: 101};
res[0][:sprites]  << {id: 102, type: 'player', class: 'me pl0', x: 120, y: 30, info: 102};

puts JSON.dump(res)
