#usage

(ruby should be installed)

```
gem install sinatra
ruby srv.rb
```

then open 127.0.0.1:4567

format for log.json:

```json
[
  {
    sprites: [
      {
        id: <number>,
        type: <'player'|'puck'|'cage'>,
        class: <'pl0'|'pl1'|'pl2'|'pl3'>,
        a: <angle - float value>
        x: <number>,
        y: <number>,
      },
      ...other sprites
    ],
    info: <any json object>
  },
  ...other frames
]
        
```
