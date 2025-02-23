import IssueFeed from "@/components/IssueFeed";
import { prisma } from "@/lib/db";
import { ExtendedIssue } from "@/types/issue";

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
    </div>
  );
}
