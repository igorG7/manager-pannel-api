import type { Request, Response } from "express";

import service from "./product-service.ts";
import ResolveError from "../../shared/utils/resolveError.ts";

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    try {
      // Substituir o updated_by por req.user.id, após implementar JWT.
      const body = req.body;
      const userId = req.body.updated_by;

      const product = await service.create(body, userId);

      return res.status(201).json({ message: "Produto criado com sucesso!", product });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  listProducts = async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);

      const products = await service.list(limit, page);

      return res.status(200).json({
        message: "Busca por produtos concluída com sucesso!",
        data: products.products,
        sizeCollection: products.sizeCollection,
      });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  listOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const product = await service.listById(id);

      res.status(200).json({ message: "Busca por produto concluída com sucesso.", product });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      // TODO: substituir por req.user.id após implementação do JWT
      const userId = req.body.updated_by;
      const body = req.body;
      const id = req.params.id as string;

      const product = await service.update(body, id, userId);

      return res.status(200).json({ message: "Produto atualizado com sucesso!", product });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  removeProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const product = await service.delete(id);

      return res.status(204).json({ message: "Produto removido com sucesso!", product });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };
}

export default new ProductController();
