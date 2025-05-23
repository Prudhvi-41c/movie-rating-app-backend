import { Request, Response } from "express";
import { fetchGenreData } from "../models/genres";

export const fetchGenres = async (req: Request, res: Response) => {
  try {
    const genreData = await fetchGenreData();
    console.log(genreData);
    res.status(200).json(genreData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
