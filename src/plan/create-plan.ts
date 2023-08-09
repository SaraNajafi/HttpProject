import {User} from '../routes/user.route';
import {plans} from '../routes/plan.route';
import { HttpError } from '../../utility/my-error';
import { createPlanDto } from './dto/create-plan.dto';

export const createPlan = (dto: createPlanDto, logedInUser: User) => {
    const plan = {
        id: plans.length+1,
        title: dto.title,
        description: dto.description || "",
        deadline: dto.deadline
    }
    if(dto.deadline.getTime()< new Date().getTime()){
        throw new HttpError(400, "You should not use a deadline in the past!")
    }
    if(logedInUser.role !== 'Admin'){
        throw new HttpError(403,"User role must be admin");
    }
    plans.push(plan);
    return plan;

}
