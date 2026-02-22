import { Request, Response } from "express";
import {
  CreateLevelInput,
  CreateTrainingInput,
  LevelResponse,
  TrainingListResponse,
  TrainingResponse,
  UpdateTrainingInput,
} from "../types/training.type";
import Helper from "../utils/helper";
import Training from "../models/training.model";
import Level from "../models/level.model";
import { ApiError } from "../utils/ApiError";
import { Types } from "mongoose";

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

  static async createLevel(req: Request, res: Response) {
    const payload: CreateLevelInput = req.body;

    const exist: LevelResponse | null = await Level.findOne({
      name: payload.name.trim().toLowerCase(),
    });

    if (exist) {
      throw new ApiError(403, "Already Exist, try new one");
    }

    const newLevel: LevelResponse = await Level.create(payload);

    res.status(201).json({
      msg: "Level created successfully",
      success: true,
      data: newLevel,
    });
  }

  static async levelList(req: Request, res: Response) {
    const levels: LevelResponse[] | [] = await Level.find();

    res.status(201).json({
      msg: "Level fetched successfully",
      success: true,
      data: levels,
    });
  }

  static async updateLevel(req: Request, res: Response) {
    const levelID = req.params.id;
    const payload: CreateLevelInput = req.body;

    const level: LevelResponse | null = await Level.findById(levelID);

    if (!level) {
      throw new ApiError(404, "No level found with this id");
    }

    const exist: LevelResponse | null = await Level.findOne({
      name: payload.name.trim().toLowerCase(),
    });

    if (exist) {
      throw new ApiError(403, "Already Exist, try new one");
    }

    level.name = payload.name.trim().toLowerCase();

    const nameAssigned: LevelResponse = await level.save();

    res.status(201).json({
      msg: "Level updated successfully",
      success: true,
      data: nameAssigned,
    });
  }
  static async deleteLevel(req: Request, res: Response) {
    const levelID = req.params.id;

    const level = await Level.findById(levelID);

    if (!level) {
      throw new ApiError(404, "No level found with this id");
    }

    // 🔥 Check if level is used in Training
    const levelIsUsing = await Training.countDocuments({
      level: levelID,
    });

    if (levelIsUsing > 0) {
      throw new ApiError(
        400,
        "This level is already assigned to training. Cannot delete.",
      );
    }

    await Level.findByIdAndDelete(levelID);

    res.status(200).json({
      success: true,
      msg: "Level deleted successfully",
    });
  }
}
