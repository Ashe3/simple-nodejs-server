const fs = require('fs');
const path = require('path');

const App = require('./app');

const app = new App();

app.use((request, response) => {
  const { url } = request;
  const dirname = path.join('public', url === '/' ? 'index' : url);
  console.log(app.routes);

  fs.readFile(dirname + '.html', null, (err, data) => {
    if (err) {
      response.writeHead(404);
      response.write(fs.readFileSync('public/404.html'));
    } else {
      response.write(data);
    }
    response.end();
  });
});

app.get('/hello', (request, response) => {
  response.end('hi bros');
  console.log(request.headers['user-agent']);
});

app.listen(process.env.PORT || 3000, () => console.log('Server started'));