import { Link } from "react-router-dom";
import MobileNav from "./Mobilenav";
import MainNav from "./MainNav";

const Header = () => {

    return (
        <div className="border-b-2 border-b-green-500 py-6"> 
        <div className="container mx-auto flex justify-between items-center">
        <Link 
         to= "/"
         className= "text-6x1 font-bold tracking-tight text-green-500">
           FoodVal
        </Link> 
        <div className="md:hidden">
            <MobileNav/>
            </div>
            <div className="hidden md:block">
                <MainNav/>
            </div>
        </div>
    </div>
    )

}

export default Header;
 
  
