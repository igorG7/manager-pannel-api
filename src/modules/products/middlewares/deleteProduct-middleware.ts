import type { Request, Response, NextFunction } from "express";

export const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;

  if (!id) throw new Error("Id do produto não fornecido.");

  next();
};
