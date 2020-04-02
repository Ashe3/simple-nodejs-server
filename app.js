const { Server } = require('http');

class App {
  constructor() {
    this.routes = [];
    this.middleware = [];
    this.methods = ['GET', 'POST'];
    this.data = [];
  }

  use(handler) {
    this.middleware.push(handler);
  }

  get(url, handler) {
    this.routes.push({
      method: 'GET',
      url, handler
    });
  }

  post(url, handler) {
    this.routes.push({
      method: 'POST',
      url, handler
    });
  }

  addMethods(methods) {
    this.methods.push(methods);
  }

  listen(port = 80, cb = () => {}) {
    new Server((request, response) => {
      this.routes.map(route => {
        this.methods.includes(route.method) && request.url === route.url ? route.handler(request, response) : null
      });
      this.middleware.map(handle => handle(request, response));
    }).listen(port, cb);
  }
}

module.exports = App;