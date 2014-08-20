require 'sinatra'

get '/' do
  send_file 'public/app.htm'
end

get '/*/log.json' do
  File.read('log.json')
end
