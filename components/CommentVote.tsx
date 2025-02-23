"use client"

import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { FunctionComponent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { VoteType } from "@prisma/client";
import { cn } from "@/lib/utils";

import { usePrevious } from "@mantine/hooks";
import { useToast } from "@/hooks/use-toast";
import { voteComment } from "@/app/actions/vote-comment";


interface CommentVoteClientProps {
    initialVotes : number, 
    commentId : string, 
    initialVote : VoteType | undefined
}
 
const CommentVoteClient: FunctionComponent<CommentVoteClientProps> = ({initialVotes,commentId,initialVote}) => {

    const [votesAmt,setVotesAmt] = useState<number>(initialVotes)
    const [currentVote,setCurrentVote] = useState(initialVote)
    const prevVote = usePrevious(currentVote)
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    function vote (type : VoteType) { 

        
        if (currentVote == type) { 
            setCurrentVote(undefined)
            if (type === "UP" ) { 
                setVotesAmt((prev) => prev-1)
            } else if (type === "DOWN") { 
                setVotesAmt((prev) => prev+ 1)
            }

        } else { 
            setCurrentVote(type)

            if (type === "UP") { 
                setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
            }
            if (type === "DOWN") { 
                setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
            }
        }

        startTransition(() => { 
            voteComment(commentId,type).then((data) => { 
                if (data.error) {
                     toast({ 
                        title : data.error, 
                        variant: "destructive"
                     })
                     if (type === "UP") setVotesAmt((prev) => prev -1)
                        else setVotesAmt((prev) => prev + 1)
            
                    setCurrentVote(prevVote)
                }
            })
        })
    }
    
    return ( <div className="flex flex-col">
        <Button size={"sm"} variant={"ghost"} aria-label="upvote" onClick={() => vote("UP")} type="button">
            <ArrowBigUp className={cn("h-5 w-5 text-zinc-700", {"text-emerald-500 fill-emerald-500" : currentVote === "UP"})}/> 
        </Button>
        <p className="text-center font-medium text-sm ">
            {votesAmt}
        </p>
        <Button size={"sm"} variant={"ghost"} aria-label="upvote" onClick={() => vote("DOWN")} type="button">
            <ArrowBigDown className={cn("h-5 w-5 text-zinc-700", {"text-red-500 fill-red-500" : currentVote === "DOWN"})}/> 
        </Button>
    </div> );
}
 
export default CommentVoteClient;