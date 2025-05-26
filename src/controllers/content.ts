import { Request, Response, RequestHandler } from "express";
import { getSearchContent, getFilteredContent } from "../models/content";
import { getTypeId } from "../models/contentTypes";
import { Content } from "../types/content";

export const fetchFilteredContent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const query: string = req.query.query as string;

    if (query != undefined) {
      if (query == "") {
        res.status(400).json({
          message: "Search Query is Required",
        });
      } else {
        const searchResult: Content[] = await getSearchContent(
          query.toLocaleLowerCase()
        );
        res.status(200).json({
          Content: searchResult,
        });
      }
    }

    const type: string = req.query.type as string;
    if (!type) {
      res.status(400).json({
        message: "Type is required",
      });
    }

    const typeData = await getTypeId(type);
    const typeId = typeData.id;

    let genres: number[] = [];
    if (req.query.genres) {
      genres = Array.isArray(req.query.genres)
        ? (req.query.genres as string[]).map(Number)
        : [Number(req.query.genres)];
    }

    const filteredContent: Content[] = await getFilteredContent(
      typeId,
      genres
    );

    res.status(200).json({
      Content: filteredContent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
