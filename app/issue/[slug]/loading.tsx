import { Skeleton } from "@/components/ui/skeleton";

 
const Loading = () => {
    return ( <div className="flex justify-center">
        <div className="max-w-[800px] w-full px-3 flex flex-col gap-3">
            <Skeleton className="w-[50%] h-14" />
            <Skeleton className="w-[20%] h-5" />
            <Skeleton className="w-full h-[300px]"/>
        </div>
    </div> );
}
 
export default Loading;