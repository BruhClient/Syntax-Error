import { Skeleton } from "@/components/ui/skeleton";

 
const Loading = () => {
    return ( <div className="flex justify-center">
        <div className="max-w-[800px] w-full px-3 flex flex-col gap-3">
            <div className="w-[50%] h-20 flex gap-3" >
                <Skeleton className="w-10 h-full" />
                <div className="flex flex-col flex-1 gap-3">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full flex-1" />
                </div>
            </div>
            
            
            <Skeleton className="w-full h-[300px]"/>

            <Skeleton className="w-full h-3"/>
            <Skeleton className="w-full h-[300px]"/>
            <Skeleton className="w-full h-20"/>
        </div>
    </div> );
}
 
export default Loading;