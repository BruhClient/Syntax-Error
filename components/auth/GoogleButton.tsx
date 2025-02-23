"use client"

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";
 
const GoogleButton = () => {
    return ( 
        <Button  size={"icon"} onClick={() => signIn("google",{redirectTo : "/"})}><FaGoogle scale={3} /></Button>
     );
}
 
export default GoogleButton;