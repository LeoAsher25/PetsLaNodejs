import { NextFunction, Request, Response } from "express";
import { ERole } from "src/types/user.type";

const checkRole = async (req: Request, res: Response, next:NextFunction, role: ERole) => {
    
}