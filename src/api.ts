import express, {Express} from 'express';
import {app as planRoutes} from './routes/plan.route'
import {app as userRoutes} from './routes/user.route'
import {app as programRoutes} from './routes/program.route'

const bodyParser = require('body-parser');






export const app = express();
app.use(express.json());
app.use("/plan", planRoutes);
app.use("/program", programRoutes);
app.use(userRoutes);
//app.use(bodyParser.urlencoded({ extended: true }));




app.use((req, res, next)=>{
    console.log(req.method , req.url)
    next();
});






// type userde = {
//     firstname: string,
//     lastname: string,
//     username: string,
//     password: string
// }


// const userss: userde[] = [];
// const validationsign = (body: any)=>{
//     if(!body.username || !body.lastname||!body.username || !body.password){
//         throw new Error("You have not send all the required fields");
//     }
//     return;
// }
// app.post('/signup', (req, res) =>{
//     validationsign(req.body);
//     const {firstname, lastname, username, password} =req.body;
//     userss.push({firstname, lastname, username, password});
//     res.status(200).send({message: 'Signup successful'});


// });

// app.post('log', (req, res)=>{

// })