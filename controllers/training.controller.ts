import { Request, Response } from "express";
import {
  CreateTrainingInput,
  TrainingListResponse,
  TrainingResponse,
  UpdateTrainingInput,
} from "../types/training.type";
import Helper from "../utils/helper";
import Training from "../models/training.model";

export class TrainingController {
  constructor() {
    // যদি future এ dependency inject করতে চাও, এখানে রাখা যাবে
  }

  // Create Training
  static async create(req: Request, res: Response) {
    const payload: CreateTrainingInput = req.body;
    let slug: string = Helper.generateSlug(payload.title);
    const exist = await Training.findOne({ slug });

    if (exist) {
      slug = `${slug}-${Helper.randomSuffix()}`;
    }
    const training: TrainingResponse = await Training.create({
      ...payload,
      slug,
    });
    res.status(201).json({
      msg: "Training created successfully",
      success: true,
      data: training,
    });
  }
  // update Training
  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const payload: UpdateTrainingInput = req.body;
    const training = await Training.findByIdAndUpdate(id, payload, {
      new: true,
    });
    res.status(201).json({
      success: true,
      data: training,
    });
  }
  // List Trainings
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
    const [trainings, total] = await Promise.all([
      Training.find(filter)
        .skip(search ? 0 : skip)
        .limit(search ? 0 : limit)
        .select(
          "title slug thumbnail createdAt updatedAt shortDescription duration",
        )
        .lean(),

      Training.countDocuments(filter),
    ]);

    const response: TrainingListResponse = {
      items: trainings,
      total,
      page,
      limit: search ? trainings.length : limit,
    };

    res.status(200).json({
      success: true,
      data: response,
    });
  }
  static async trainingBySlug(req: Request, res: Response) {
    const slug = String(req.params.slug).trim();

    const training = (await Training.findOne({
      slug,
    }).lean()) as TrainingResponse;

    if (!Training) {
      return res.status(404).json({
        success: false,
        message: "Training not found",
      });
    }

    res.status(200).json({
      success: true,
      data: training,
    });
  }
}
