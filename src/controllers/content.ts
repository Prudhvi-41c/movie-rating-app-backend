import { Request, Response, RequestHandler } from "express";
import { getSearchContent, getFilteredContent } from "../models/content";
import { getContentTypeData } from "../models/contentTypes";
import { Content } from "../types/content";
import { fetchGenreData } from "../models/genres";
import { ContentTypeData } from "../types/contentType";

export const fetchFilteredContent: RequestHandler = async (req: Request, res: Response) => {
  try {

    if (Array.isArray(req.query.type)) {
      res.status(400).json({
        message: "multiple types are not supported",
      });
      return;
    }

    if (Array.isArray(req.query.query)) {
      res.status(400).json({
        message: "multiple search queries are not supported",
      });
      return;
    }

    const query: string = req.query.query as string;
    const type: string = req.query.type as string;
    let genres: string[] = [];
    let genreIds: number[] = [];
    let typeId = null;

    if (type === undefined) {
      if (req.query.genres) {
        res.status(400).json({
          message: "type is required when genres are used",
        });
        return;
      }
      if (query === undefined) {
        res.status(400).json({
          message: "type or query must be provided",
        });
        return;
      }
    }

    if (type !== undefined) {
      const contentTypeData: ContentTypeData | undefined = await getContentTypeData(type);

      if (!contentTypeData) {
        res.status(400).json({
          message: `type ${type} does not exist`,
        });
        return;
      }
      typeId = contentTypeData.id;
    }

    if (query !== undefined) {
      if (query === "") {
        res.status(400).json({
          message: "search query is required",
        });
        return;
      } else {
        const searchResult: Content[] = await getSearchContent(query.toLocaleLowerCase(), typeId);
        res.status(200).json({
          content: searchResult,
        });
        return;
      }
    }

    if (req.query.genres) {
      genres = Array.isArray(req.query.genres) ? (req.query.genres as string[]) : [req.query.genres as string];
      const genreData = await fetchGenreData();
      genreIds = genres.map((genreFromUser) => {
        let genre = genreData.find((g) => g.genre.toLocaleLowerCase() === genreFromUser.toLocaleLowerCase());
        if (genre === undefined) {
          return null;
        } else {
          return genre.id;
        }
      });
    }

    for (let i = 0; i < genreIds.length; i++) {
      if (genreIds[i] === null) {
        res.status(400).json({
          message: `genre ${genres[i]} does not exist`,
        });
        return;
      }
    }

    if (typeof typeId === "number") {
      const filteredContent: Content[] = await getFilteredContent(typeId, genreIds);
      res.status(200).json({
        content: filteredContent,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
