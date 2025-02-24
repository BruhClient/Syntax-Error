import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return ( <div className="w-full flex pb-8 flex-col items-center justify-center gap-3 px-3 py-4">
            <Skeleton className="h-44 w-44 rounded-full" />
            <Skeleton className="w-36 h-8"/>
            <Skeleton className="w-36 h-4"/>
            <Skeleton className="w-36 h-8"/>
            <Skeleton className="w-full max-w-[800px]  h-2"/>
            <Skeleton className="w-36 h-14"/>
            <Skeleton className="w-80 h-14"/>
            <Skeleton className="w-80 h-14"/>
    </div> );
}
 
export default Loading;