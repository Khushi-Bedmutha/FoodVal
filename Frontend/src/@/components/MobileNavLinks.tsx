import { Link, useAsyncValue } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"

const MobileNavLinks = () => { 
    const {logout} = useAuth0();
    return (
        <>
        <Link 
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-green-500">
        Order Status
        </Link>
        <Link 
        to="/manage-industry"
        className="flex bg-white items-center font-bold hover:text-green-500">
        My Industry
        </Link>
        <Link 
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-green-500">
        UserProfile
        </Link>
        <Button
         onClick={  () =>logout()}
         className="flex items-center px-3 font-bold hover: bg-gray-500 ">
            Log Out
        </Button>
        
       
        </>
    )
}

export default MobileNavLinks;