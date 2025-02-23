"use client"

import { FunctionComponent, useTransition } from "react";
import { Button } from "./ui/button";
import { asignSolution } from "@/app/actions/asign-as-solution";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SolutionButtonProps {
    commentId  : string 
    isSolution: boolean , 
}
 
const SolutionButton: FunctionComponent<SolutionButtonProps> = ({isSolution,commentId}) => {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const {toast} = useToast()
    function toggleSolution () { 

        startTransition(() => { 
            asignSolution(commentId,!isSolution).then((data) => { 
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
    return ( <Button onClick={() => toggleSolution() } disabled={isPending}>{isSolution ? "Remove Solution" : "Mark as Solution"}</Button> );
}
 
export default SolutionButton;