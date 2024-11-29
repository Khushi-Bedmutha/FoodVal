import { Request, Response } from "express";
import Industry from "../models/Industry";



const getIndustry = async (req: Request, res: Response) => {
  try {
    const industryId = req.params.industryId;

    const industry = await Industry.findById(industryId);
    if (!industry) {
      return res.status(404).json({ message: "Industry not found" });
    }

    res.json(industry);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};




const searchIndustry = async (req: Request, res: Response) => {

    
  
  try {
        const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
   
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Industry.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json(
        {
          data: [],
          pagination: {
            total: 0,
            page: 1,
            pages: 1,
          },
        });
      }
      


    if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, "i");
        query["$or"] = [
          { industryName: searchRegex },
         
        ];
      }

      const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const industries = await Industry.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

      const total = await Industry.countDocuments(query);

      const response = {
        data: industries,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
      res.json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export default {
    getIndustry,
    searchIndustry,
  };