import UserModel from "../models/user.model";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import { loginSchemaType, registerSchemaType } from "../validators/auth.validator";

export const registerUserService = async (body: registerSchemaType) => {
    const { name, email, password, avatarUrl } = body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) throw new UnauthorizedException("User with this email already exists");

    const newUser = await UserModel.create({ name, email, password, avatarUrl });

    await newUser.save();

    return newUser;
}

export const loginService = async (body: loginSchemaType) => {
    const { email, password } = body;

    const user = await UserModel.findOne({ email });
    if (!user) throw new NotFoundException("Email or Password not found");

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
        throw new UnauthorizedException("Invaild email or password");

    return user;
};