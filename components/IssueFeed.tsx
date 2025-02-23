"use client"
import {useIntersection} from "@mantine/hooks"
import { FunctionComponent, useEffect, useRef } from "react";
import {useInfiniteQuery} from "@tanstack/react-query"
import { getIssues } from "@/app/actions/get-issues";
import IssueCard from "./IssueCard";
import { ExtendedIssue } from "@/types/issue";
import { Skeleton } from "./ui/skeleton";

interface IssueFeedProps {
    initialIssues : ExtendedIssue[], 
    take? : number 
}
 
const IssueFeed: FunctionComponent<IssueFeedProps> = ({initialIssues,take=5}) => {


    const lastPostRef = useRef(null)

    const {ref,entry} = useIntersection({ 
        root: lastPostRef.current, 
        threshold : 1
    })


    const {data,hasNextPage,isFetching,fetchNextPage } = useInfiniteQuery({ 
        queryKey : ["Issues"], 
        queryFn: async ({ pageParam = 1 }) => {
            const issues = await getIssues(pageParam * take,take) 

            return issues
        },
        
      
        initialPageParam : 1 , 
            getNextPageParam : (lastPage, allPages, lastPageParam ) => { 

             
                if (lastPage.length < take ) { 
                    return undefined
                }
                return lastPageParam + 1
            }, 
        
    })

    
    const fetchedPages = data?.pages.flatMap((page) => page) ?? [] 
    const pages = [...initialIssues,...fetchedPages] as ExtendedIssue[] 

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) { 
            fetchNextPage()
        }
     },[entry])
    return ( <div className="max-w-[600px] w-full flex flex-col gap-3 px-3 py-3">

        {pages.map(({title,author,_count,createdAt,id,isSolved,votes,threads},index) => { 

            if (index === pages.length -1) { 
                return <div ref={ref} key={id}>
                        <IssueCard  
                            id={id} 
                            title={title} 
                            createdAt={createdAt} 
                            commentCount={_count.comments} 
                            isSolved={isSolved} 
                            author={author} 
                            votes={votes} 
                            threads={threads}
                        />
                    </div>
            }
            return <IssueCard 
                key={id} id={id} 
                title={title} 
                createdAt={createdAt} 
                commentCount={_count.comments} 
                isSolved={isSolved} 
                author={author} 
                votes={votes} 
                threads={threads} 
            />
        })}

        {isFetching && 
        
        <>
            <Skeleton className="w-full h-[100px]" />
            <Skeleton className="w-full h-[100px]" />
        
        </>}

     

       


    </div> );
}
 
export default IssueFeed;