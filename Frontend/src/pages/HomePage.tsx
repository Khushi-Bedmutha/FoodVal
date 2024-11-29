import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/@/components/card';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  const handleGiveawayWasteClick = () => {
    navigate('/giveawaywaste');
  };

  const handleGetWasteClick = () => {
    navigate('/getwaste');
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16"> 
        <h1 className="text-2xl font-bold tracking-tight text-green-600">Waste to Energy</h1>
        <span className="text-x1">A new way to reduce waste!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-12 ">
          <Card className="flex flex-col items-center">
            <CardHeader>
              <CardTitle className="text-1xl font-bold mb-2">Biogas Plants/Composting Unit</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://etimg.etb2bimg.com/thumb/103784197.cms?width=350&height=250"
                alt="Card image1"
                className="w-full h-auto rounded-md mb-4"
              />
              <p> Waste converted into biogas and manure</p>
            </CardContent>
            <CardFooter>
              <button 
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={handleGetWasteClick} // Add click handler
              >
                Know More
              </button>
            </CardFooter>
          </Card>
          <Card className="flex flex-col items-center">
            <CardHeader>
              <CardTitle className="text-1xl font-bold mb-2">Food Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://etimg.etb2bimg.com/thumb/87333245.cms?width=350&height=250"
                alt="Card image2"
                className="w-full h-auto rounded-md mb-4"
              />
              <p> Food waste generated in industries</p>
            </CardContent>
            <CardFooter>
              <button 
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                onClick={handleGiveawayWasteClick} // Add click handler
              >
               Know more
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
