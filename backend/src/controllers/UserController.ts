import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  static async register(req: Request, res: Response) {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    try {
      const user = await UserService.register(req.body);

      return res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        error,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await UserService.login(email, password);

      return res.status(200).json({
        message: "Login Successful",
        data,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: (error as Error).message,
      });
    }
  }
}
