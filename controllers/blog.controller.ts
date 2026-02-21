import { Request, Response } from "express";
import Blog from "../models/blog.model";
import {
  CreateBlogInput,
  BlogListResponse,
  BlogResponse,
  UpdateBlogInput,
} from "../types/blog.type";
import Helper from "../utils/helper";

export class BlogController {
  constructor() {
    // যদি future এ dependency inject করতে চাও, এখানে রাখা যাবে
  }

  // Create Blog
  static async create(req: Request, res: Response) {
    const payload: CreateBlogInput = req.body;
    let slug: string = Helper.generateSlug(payload.title);
    const exist = await Blog.findOne({ slug });

    if (exist) {
      slug = `${slug}-${Helper.randomSuffix()}`;
    }
    const blog: BlogResponse = await Blog.create({
      ...payload,
      slug,
    });
    res.status(201).json({
      msg: "blog created successfully",
      success: true,
      data: blog,
    });
  }
  // update Blog
  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const payload: UpdateBlogInput = req.body;
    const blog = await Blog.findByIdAndUpdate(id, payload, { new: true });
    res.status(201).json({
      success: true,
      data: blog,
    });
  }
  // List Blogs
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
    const [Blogs, total] = await Promise.all([
      Blog.find(filter)
        .skip(search ? 0 : skip)
        .limit(search ? 0 : limit)
        .select("title slug thumbnail createdAt updatedAt shortDescription")
        .lean(),

      Blog.countDocuments(filter),
    ]);

    const response: BlogListResponse = {
      items: Blogs,
      total,
      page,
      limit: search ? Blogs.length : limit,
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  }
  static async blogBySlug(req: Request, res: Response) {
    const slug = String(req.params.slug).trim();

    const blog = (await Blog.findOne({
      slug,
    }).lean()) as BlogResponse;

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  }
}
