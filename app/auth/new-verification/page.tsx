"use client"

import { verify_account } from "@/app/actions/verify-account";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
    Card,

    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
 
const NewVerificationPage = () => {

    const searchParams = useSearchParams()

    const token = searchParams.get("token")
    const [isPending,startTransition] = useTransition()
 
    const [status,setStatus] = useState<"Success"|"Error">("Success")
    const [message,setMessage] = useState<string>("")
   
    useEffect(() => { 
    
        startTransition(() => { 
            
            verify_account(token ?? "").then((data) => { 
                if (data.error) { 
                    setStatus("Error")
                    setMessage(data.error)
                } else if (data.success) { 
                    
                    setStatus("Success")
                    setMessage(data.success)
             
                    
                }
            })
        })
    },[token])
    return ( <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[-1]">

        {isPending ? <Skeleton className="max-w-[300px] max-h-[300px] w-full h-full"/> : (<Card className="px-4 py-8">
            <CardHeader>
                <CardTitle className="text-center text-xl">{message}</CardTitle>
                <CardDescription className="text-center">{status}</CardDescription>
            </CardHeader>
            
            <CardFooter>
                <Button><ChevronLeft /><Link href={"/signin"}>Head back to sign in page</Link></Button>
            </CardFooter>
        </Card>)}

        

        
    </div> );
}
 
export default NewVerificationPage;