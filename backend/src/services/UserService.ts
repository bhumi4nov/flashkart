import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { generateToken } from "../utils/jwt";

export class UserService {
  static async register(data: Partial<User>) {
    const existingUser = await UserRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const user = UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    return await UserRepository.save(user);
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();

    if (!user) {
      throw new Error("Invalid Email or Password");
    }

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User:", user);
    console.log("User Password:", user?.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Email or Password");
    }

    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
