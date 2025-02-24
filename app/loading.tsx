import { Skeleton } from "@/components/ui/skeleton";

 
const Loading = () => {
    return ( <div className="flex w-full justify-center gap-3 ">
        <div className="max-w-[600px] w-full flex flex-col gap-3 px-3 py-3">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" /><Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
        </div>
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
    </div> );
}
 
export default Loading;