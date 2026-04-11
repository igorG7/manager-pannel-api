import type { Request, Response } from "express";

import service from "./product-service.ts";

class ProductController {
  createProduct = async (req: Request, res: Response) => {
    try {
      // Substituir o updated_by por req.user.id, após implementar JWT.
      const body = req.body;
      const userId = req.body.updated_by;

      const product = await service.create(body, userId);

      return res.status(201).json({ message: "Produto criado com sucesso!", product });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor.", error });
    }
  };

  listProducts = async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);

      const products = await service.list(limit, page);

      return res.status(200).json({
        message: "Busca por produtos concluída com sucesso!",
        products: products.products,
        sizeCollection: products.sizeCollection,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produtos." });
    }
  };

  listOne = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const product = await service.listById(id);

      res.status(200).json({ message: "Busca por produto concluída com sucesso.", product });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto." });
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
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erro ao atualizar produto." });
    }
  };

  removeProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      const product = await service.delete(id);

      return res.status(204).json({ message: "Produto removido com sucesso!", product });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao remover produto." });
    }
  };
}

export default new ProductController();
