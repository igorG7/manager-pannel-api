import { Conflict, NotFound } from "../../shared/utils/appErrors.ts";
import type { IProduct } from "./domain/product-interface.ts";
import Product from "./infrastructure/products.ts";

class ProductService {
  private async productExist(product: any) {
    return await Product.findOne({
      _id: { $ne: product._id }, // ignora o próprio produto
      name: { $regex: new RegExp(`^${product.name}$`, "i") },
      maker: { $regex: new RegExp(`^${product.maker}$`, "i") },
      provider: { $regex: new RegExp(`^${product.provider}$`, "i") },
    });
  }

  async create(data: any, userId: string) {
    const productExist = await this.productExist(data);

    if (productExist)
      throw new Conflict("Já existe um produto com esse nome, fabricante e fornecedor.");

    const newProduct = { ...data, updated_by: userId };
    const product = await Product.create(newProduct);

    return product;
  }

  async update(data: Partial<IProduct>, id: string, userId: string) {
    // ! Propriedade packaging. A atualização dessa propriedade substitui o objeto inteiro, um merge com dot notation deve ser realizado para evitar.

    const productExist = await this.productExist(data);

    if (productExist)
      throw new Error("Já existe um produto com esse nome, fabricante e fornecedor.");

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...data,
        updated_by: userId,
      },
      { new: true },
    );

    if (!product) throw new NotFound("Produto não encontrado.");

    return product;
  }

  async delete(id: string) {
    const product = await Product.findByIdAndDelete(id);

    if (!product) throw new NotFound("Produto não encontrado.");

    return product;
  }

  async list(limit: number, page: number) {
    const skip = (page - 1) * limit;

    const products = await Product.find().sort({ name: 1 }).limit(limit).skip(skip);

    const sizeCollection = await Product.countDocuments();

    return { products, sizeCollection };
  }

  async listById(id: string) {
    const product = await Product.findById(id);

    if (!product) throw new NotFound("Produto não encontrado.");

    return product;
  }
}

export default new ProductService();
