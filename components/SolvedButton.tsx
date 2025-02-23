"use client"

import { FunctionComponent, useTransition } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { asignSolved } from "@/app/actions/asign-as-solved";

interface SolvedButtonProps {
    issueId  : string 
    isSolved: boolean , 
}
 
const SolvedButton: FunctionComponent<SolvedButtonProps> = ({isSolved,issueId}) => {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const {toast} = useToast()
    function toggleSolved () { 

        startTransition(() => { 
            asignSolved(issueId,!isSolved).then((data) => { 
                if (data.error) { 
                    toast({ 
                        title : data.error, 
                        variant : "destructive"
                    })
                } else { 
                    toast({ 
                        title : data.success
                    })
                }
                router.refresh()
            })
        })
       
    }
    return ( <Button onClick={() => toggleSolved() } disabled={isPending}>{isSolved ? "Mark as Unanswered" : "Mark as Solved"}</Button> );
}
 
export default SolvedButton;