import type { Request, Response } from "express";
import ResolveError from "../../shared/utils/resolveError.ts";
import service from "./stock-services.ts";

class StockMovementController {
  list = async (req: Request, res: Response) => {
    try {
      const { movement, sizeCollection } = await service.list(req.query);

      return res.status(200).json({
        message: "Movimentações listadas com sucesso!",
        data: movement,
        sizeCollection,
      });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  moveIn = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      const movement = await service.bulkIn(body);

      return res.status(200).json({
        message: "Movimentação registrada com sucesso!",
        data: movement,
      });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };

  moveOut = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      const movement = await service.moveOut(body);

      return res.status(200).json({
        message: "Movimentação registrada com sucesso!",
        data: movement,
      });
    } catch (error) {
      ResolveError.resolve(error);
    }
  };
}

export default new StockMovementController();
