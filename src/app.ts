import * as express from 'express'
import * as employeeController from './routes/employee'

class App {
  public express

  constructor () {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router();

    router.get('/employee', employeeController.getEmployee);
    router.post('/employee', employeeController.postEmployee);
    router.put('/employee', employeeController.putEmployee);
    router.delete('/employee', employeeController.deleteEmployee);

    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    });
    this.express.use('/', router);
  }
}

export default new App().express