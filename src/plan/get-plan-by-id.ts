import { HttpError } from "../../utility/my-error";
import { Plan, plans } from "../routes/plan.route";



export const getPlanById = (id: number): Plan =>{
    const plan = plans.find((plan) => plan.id === id)
    if(plan === undefined){
        throw new HttpError(400, "Plan not found");

    }
    return plan;
};