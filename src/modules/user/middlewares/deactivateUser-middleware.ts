import type { Request, Response, NextFunction } from "express";

export const deactivateUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  if (!id) throw new Error("Id de usuário não fornecido.");

  next();
};
