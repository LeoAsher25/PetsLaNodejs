import { NextFunction, Request, Response } from "express";
import { ERole, UserDto } from "src/types/user.type";

const checkRole = async (req: Request, res: Response, next:NextFunction, role: ERole) => {
    const user  = req.user as UserDto
    // if(user?.roles)
    next()
}
export default checkRole