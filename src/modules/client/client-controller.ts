import type { Request, Response } from "express";
import ResolveError from "../../shared/utils/resolveError.ts";

import service from "./client-service.ts";

class ClientController {
  list = async (req: Request, res: Response) => {
    try {
      const { clients, sizeCollection } = await service.list(req.query);

      return res.status(200).json({
        message: "Busca por clientes concluída com sucesso!",
        data: clients,
        sizeCollection,
      });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  listOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const client = await service.listOne(id);

      return res.status(200).json({
        message: "Busca por cliente concluída com sucesso!",
        data: client,
      });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  createClient = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const client = await service.create(body);

      res.status(201).json({ message: "Cliente cadastrado com sucesso!", data: client });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  updateClient = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const body = req.body;

      const client = await service.update(body, id);

      return res.status(200).json({ message: "Cliente atualizado com sucesso!", data: client });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  deleteClient = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const client = await service.delete(id);

      return res.status(200).json({ message: "Cliente deletado com sucesso!", data: client });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };
}

export default new ClientController();
