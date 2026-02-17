import { Request, Response } from "express";
import Product from "../models/product.model";
import { CreateProductInput, UpdateProductInput } from "../types/product.type";

export class ProductController {
  constructor() {
    // যদি future এ dependency inject করতে চাও, এখানে রাখা যাবে
  }

  // Create Product
  static async create(req: Request, res: Response) {
    try {
      const payload: CreateProductInput = req.body;
      const product = await Product.create(payload);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  // update Product
  static async update(req: Request, res: Response) {
    try {
      const payload: UpdateProductInput = req.body;
      const product = await Product.create(payload);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  // List Products
  static async list(req: Request, res: Response) {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
