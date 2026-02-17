import { Request, Response } from "express";
import Product from "../models/product.model";
import {
  CreateProductInput,
  ProductListResponse,
  ProductResponse,
  UpdateProductInput,
} from "../types/product.type";
import Helper from "../utils/helper";

export class ProductController {
  constructor() {
    // যদি future এ dependency inject করতে চাও, এখানে রাখা যাবে
  }

  // Create Product
  static async create(req: Request, res: Response) {
    const payload: CreateProductInput = req.body;
    let slug: string = Helper.generateSlug(payload.title);
    const exist = await Product.findOne({ slug });

    if (exist) {
      slug = `${slug}-${Helper.randomSuffix()}`;
    }
    const product: ProductResponse = await Product.create({
      ...payload,
      slug,
    });
    res.status(201).json({
      success: true,
      data: product,
    });
  }
  // update Product
  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const payload: UpdateProductInput = req.body;
    const product = await Product.findByIdAndUpdate(id, payload, { new: true });
    res.status(201).json({
      success: true,
      data: product,
    });
  }
  // List Products
  static async list(req: Request, res: Response) {
    const search = String(req.query.search || "").trim();

    let page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    let filter: any = {};

    // যদি search থাকে
    if (search) {
      page = 1; // search থাকলে page reset

      filter = {
        title: { $regex: search, $options: "i" }, // case insensitive search
      };
    }

    const skip = (page - 1) * limit;

    // যদি search থাকে → pagination ছাড়া সব data
    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip(search ? 0 : skip)
        .limit(search ? 0 : limit)
        .select("title slug rating thumbnail")
        .lean(),

      Product.countDocuments(filter),
    ]);

    const response: ProductListResponse = {
      items: products,
      total,
      page,
      limit: search ? products.length : limit,
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  }
  static async productBySlug(req: Request, res: Response) {
    const slug = String(req.params.slug).trim();

    const product = (await Product.findOne({
      slug,
    }).lean()) as ProductResponse;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  }
}
