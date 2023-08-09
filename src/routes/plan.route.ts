import { Router, Response } from "express";
import { ZodError } from "zod";
import { handleExpress } from "../../utility/handle-express";
import { HttpError } from "../../utility/my-error";
import { isNonEmptyString } from "../../utility/non-empty-string";
import { createPlan } from "../plan/create-plan";
import { createPlanDto } from "../plan/dto/create-plan.dto";
import { getPlanById } from "../plan/get-plan-by-id";
import { users } from "./user.route";
import {User} from "./user.route";

export const app  = Router();


export interface Plan {
    id :number;
    title : string,
    description : string,
    deadline : Date
}


export const plans: Plan[] = []


app.post('/', (req, res, next)=>{

    const userId = req.headers['authorization']
    const logedInUser = users.find((user) => user.id===userId);
    console.log(logedInUser);
    
    if(!logedInUser){
        res.status(401).send({message: 'Unauuthorized'});
        return;
    }
   
    
    const title = req.body.title;
    const description = req.body.description;
    const deadline = req.body.deadline;
    console.log(title);
    console.log(description);
    
    // if (!isNonEmptyString(title)){
    //     res.status(400).send({ message:"Title must be string and not empty"});
    //     return;
    // }
    // if(deadline === undefined){
    //     res.status(400).send({ message:'deadline must be provided'});
    // }
   const deadlineTime = new Date(deadline);
    // if(isNaN(deadlineTime.getTime())){
    //     res.status(400).send({ message:'Invalid deadline'})
    //     return;
    // }
    console.log("this is body:  "+req.body)
    try{
    const dto = createPlanDto.parse({title, description:description, deadline:deadlineTime}); //chera hadi mitone req.body bede man nemitonam
    console.log("this is "+dto);

    handleExpress(res, ()=>createPlan(dto, logedInUser));

    }catch(e){
        if(e instanceof ZodError){
            res.status(400).send({ message: e.errors});
        }
    }
 

});









app.get('/:id', (req, res, next)=>{
    const planID = parseInt(req.params.id);
    if(isNaN(planID)){
        res.status(400).send({ message:"ID should be a number"});
        return;
    }

    handleExpress(res, ()=>getPlanById(planID));
    

});





