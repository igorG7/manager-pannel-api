import type { IUser } from "./domain/user-interface.ts";
import User from "./infrastructure/user.ts";

import { Password } from "../shared/utils/password/password.ts";
import { Conflict, NotFound, Unauthorized } from "../../shared/utils/appErrors.ts";

type LoginType = {
  email: string;
  password: string;
};

class UserService {
  private async emailExists(email: string) {
    return await User.findOne({ email });
  }

  async create(data: IUser) {
    const emailExists = await this.emailExists(data.email);
    if (emailExists) throw new Conflict("E-mail já cadastrado.");

    const password_hash = await Password.hash(data.password);

    const user = await User.create({ ...data, password: password_hash });

    return user;
  }

  async login({ email, password }: LoginType) {
    const user = await User.findOne({ email }).select("+password").lean();

    if (!user) throw new Unauthorized("Credênciais inválidas");

    const isMatch = await Password.compare(user.password, password);

    if (!isMatch) throw new Unauthorized("Credênciais inválidas");

    const loggedIn: Partial<IUser> = user;
    delete loggedIn.password;

    return loggedIn;
  }

  async updatePassword(email: string, newPassword: string) {
    const newHash = await Password.hash(newPassword);

    const user = await User.findOneAndUpdate(
      { email },
      { password: newHash, updatedAt: new Date() },
      { new: true },
    ).lean();

    if (!user) throw new NotFound("Usuário não encontrado.");

    return user;
  }

  async update(id: string, data: any) {
    const user = await User.findByIdAndUpdate(
      id,
      { ...data, updateAt: new Date() },
      { new: true },
    ).lean();

    if (!user) throw new NotFound("Usuário não encontrado.");

    return user;
  }

  async deactivate(id: string) {
    const user = await User.findByIdAndUpdate(
      id,
      { active: false, updatedAt: new Date() },
      { new: true },
    ).lean();

    if (!user) throw new NotFound("Usuário não encontrado.");

    return user;
  }

  async list(query: any) {
    const { page, limit } = query;
    const filter: Record<string, any> = {};

    if (query.active !== undefined) {
      filter.active = Boolean(query.active);
    } else {
      filter.active = true;
    }

    if (query.role) filter.role = query.role;

    const users = await User.find(filter)
      .limit(limit)
      .skip(page - 1)
      .lean();

    const sizeCollection = await User.countDocuments(filter);

    return { users, sizeCollection };
  }

  async listOne(id: string) {
    const user = await User.findById(id).lean();

    if (!user) throw new NotFound("Usuário não encotrado.");

    return user;
  }
}

export default new UserService();
