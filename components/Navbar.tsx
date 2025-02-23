import UserAvatar from "./auth/UserAvatar";
import Logo from "./Logo";
import { Searchbar } from "./Searchbar";

 
const Navbar = () => {
    return ( <div className="px-5 py-3">


            <div className="w-full items-center justify-between hidden md:flex gap-3 ">
                <Logo size={25}/>
            
            
                
            <Searchbar />
            <UserAvatar />
            </div>

            <div className="w-full flex-col flex md:hidden gap-3 ">

                <div className="flex w-full justify-between items-center">
                    <Logo size={25}/>
                    <UserAvatar />
                </div>
                
            
            
                
                <Searchbar />
            
            </div>
            
            
         
        
           

        
    </div> );
}
 
export default Navbar;