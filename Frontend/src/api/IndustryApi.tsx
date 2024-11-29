import { SearchState } from "@/pages/SearchPage";
import { Industry, IndustrySearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetIndustry = (industryId?: string) => {
  const getIndustryByIdRequest = async (): Promise<Industry> => {
    const response = await fetch(
      `${API_BASE_URL}/api/industry/${industryId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get industry");
    }

    return response.json();
  };

  const { data: industry, isLoading } = useQuery(
    "fetchindustry",
    getIndustryByIdRequest,
    {
      enabled: !!industryId,
    }
  );

  return { industry, isLoading };
};


export const useSearchIndustry = (searchState: SearchState, city?: string
  ) => {
    const createSearchRequest =  async ():Promise<IndustrySearchResponse>  => {
       const params = new URLSearchParams();

       params.set("searchQuery", searchState.searchQuery);
       params.set("page", searchState.page.toString());
    
        const response = await fetch(
            `${API_BASE_URL}/api/industry/search/${city}?${params.toString()}`
          );

          if (!response.ok) {
            throw new Error("Failed to get restaurant");
          }
      
          return response.json()

    }
    const { data: results, isLoading } = useQuery(
        ["searchIndustry", searchState],
        createSearchRequest,
        { enabled: !!city }
      );

      return {
        results,
        isLoading,
      };
}