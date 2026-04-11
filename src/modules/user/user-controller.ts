import type { Request, Response } from "express";
import userService from "./user-service.ts";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = await userService.create(body);

      return res.status(201).json({ message: "Usuário cadastrado com sucesso!", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = await userService.login(body);

      return res.status(200).json({ message: "Autenticação realizada com sucesso!", user });
    } catch (error: any) {
      return res.status(401).json({
        error: error.message || "Erro ao realizar login",
      });
    }
  }

  async updateUserPassword(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.updatePassword(email, password);

      return res.status(200).json({ message: "Senha atualizada com sucesso!", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const id = req.params.id as string;
      const user = await userService.update(id, body);

      return res.status(200).json({ message: "Dados de usuario atualizados com sucesso!", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async deactivateUser(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const user = await userService.deactivate(id);

      return res.status(200).json({ message: "Usuário desativado com sucesso!", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const query = req.query;

      const users = await userService.list(query);

      return res.status(200).json({ message: "Busca por usuários concluída!", users });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async listOne(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const user = await userService.listOne(id);

      return res.status(200).json({ message: "Busca por usuário concluída!", user });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }
}

export default new UserController();
