import { Request, Response } from "express";
import Movement from "../../database/models/movement";

// Getting all movements
export const getAllMovements = async (req: Request, res: Response) => {
  try {
    const movements = await Movement.find({
      actors: { $in: ["jean paul"] },
    }).sort({ updatedAt: -1 });
    return res.status(200).json({
      message: "Movements retrieved successfully",
      count: movements.length,
      data: movements,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Getting one movement
export const getMovement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movement = await Movement.findById(id);

    return res
      .status(200)
      .json({ message: "Movement retrieved successfully", data: movement });
  } catch (error: any) {
    return res.status(404).json({
      message: "Movement not found",
    });
  }
};

// Create new movement
export const addMovement = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { title, description, creator, creatorId, actors } = req.body;

    const movement = await Movement.create({
      title,
      description,
      creator,
      creatorId,
      actors,
    });

    return res
      .status(201)
      .json({ message: "Movement created successfully", movement });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//Delete movement
export const deleteMovement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movement = await Movement.findByIdAndDelete(id);

    if (!movement) {
      return res.status(404).json({
        message: "Movement not found",
      });
    }

    return res.status(200).json({ message: "Movement deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
