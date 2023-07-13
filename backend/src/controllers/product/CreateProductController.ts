import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    } else {
      const product = await createProductService.execute({
        name,
        price,
        description,
        banner: req.file.filename,
        category_id
      });

      return res.json(product);
    }

  }
}

export { CreateProductController }