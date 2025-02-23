"use client"
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface LogoProps {
    size : number
}
 
const Logo: FunctionComponent<LogoProps> = ({size}) => {
    const router = useRouter()
    return ( 
    
            <h1 style={{fontSize:size}} onClick={() => router.push("/")}className="font-bold text-nowrap cursor-pointer">Syntax Error</h1>
       );
}
 
export default Logo;