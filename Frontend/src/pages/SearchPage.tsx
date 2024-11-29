import { useSearchIndustry } from "@/api/IndustryApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";


export type SearchState = {
  searchQuery: string;
  page: number;
  sortOption: string;
};
const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
      searchQuery: "",
      page: 1,
      sortOption: "bestMatch",
    });
  const { results, isLoading} = useSearchIndustry( searchState, city);
  
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      
    }));
  };
  
  if(isLoading) {
    <span>Loading ...</span>
  }
  
  if(!results?.data|| !city){
    return <span>No results found</span>; 
  }

  return(
    <div className="gap-5 justify-center items-center">
     <div id="main-content" className="flex flex-col gap-5">
      <SearchBar 
      searchQuery={searchState.searchQuery}
      onSubmit={setSearchQuery}
      placeHolder="Search by City orIndustry Name"
      onReset={resetSearch}/>
      <SearchResultInfo total={results.pagination.total} city={city}/>
      {results.data.map((industry) => (
          <SearchResultCard industry={industry} />
        ))}
      </div>
      </div>
   )

  

}
export default SearchPage;