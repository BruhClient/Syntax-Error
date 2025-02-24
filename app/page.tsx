import IssueFeed from "@/components/IssueFeed";
import Leaderboard from "@/components/Leaderboard";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/db";
import { ExtendedIssue } from "@/types/issue";
import { Suspense } from "react";

export default async function Home() {

  const initialIssues = await prisma.issue.findMany({ 
    take :5 ,
    orderBy: [
      {
        createdAt: "desc", 
      },
    ],
    include : { 
      _count : { 
        select : { 
          comments : true
        }
      },
      author : true , 
      votes : true
    }
    
  }) as ExtendedIssue[]
  

  
  return (
    <div className="flex justify-center" >
      
      <IssueFeed initialIssues={initialIssues}/>
      
      <Suspense fallback={
          <div className="hidden md:flex flex-col max-w-[300px] w-full px-3 py-3 gap-3  ">
              <Skeleton className="w-[50%] h-9" />
              <div className="w-full flex gap-3 items-center">
                  <Skeleton className="w-7 h-7 aspect-square rounded-full"/>
                  <Skeleton className="w-full h-7"/>
                  
              </div>
              <div className="w-full flex gap-3 items-center">
                  <Skeleton className="w-7 h-7 aspect-square rounded-full"/>
                  <Skeleton className="w-full h-7"/>
                  
              </div>
              <div className="w-full flex gap-3 items-center">
                  <Skeleton className="w-7 h-7 aspect-square rounded-full"/>
                  <Skeleton className="w-full h-7"/>
                  
              </div>
              <div className="w-full flex gap-3 items-center">
                  <Skeleton className="w-7 h-7 aspect-square rounded-full"/>
                  <Skeleton className="w-full h-7"/>
                  
              </div>
          
          
          </div>
      }>
        <Leaderboard />
      </Suspense>
      
    </div>
  );
}
