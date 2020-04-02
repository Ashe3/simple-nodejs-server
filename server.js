const App = require('./app');

const app = new App();

app.use((request, response) => {
  response.end('Hello World');
});

app.get('/hello', (request, response) => {
  response.end('Hi bro');
  console.log(request.headers['user-agent']);
});

app.listen(process.env.PORT || 3000, () => console.log('Server started'));