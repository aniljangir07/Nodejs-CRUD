import express, { Router } from 'express';
import bodyParser from 'body-parser';

import taskRoutes from './routes/routes.js'
import statusCodes from './constants/status.js';
import responseMessages from './constants/message.js';

const app = express();

app.use(bodyParser.json());

app.use("/",taskRoutes);

// This should be the last route else any after it wont work
app.use("*", (req,res,next) => {
      res.status(statusCodes.NOT_FOUND).json({
            success: false,
            message: responseMessages.ROUTE_NOT_FOUND,
      });
});

app.listen(3000,(err)=>{
      console.log(' server listening on 3000 ');
})