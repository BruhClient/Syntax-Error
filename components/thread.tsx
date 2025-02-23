"use client "
import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface ThreadProps {
    selectedThreads: string[],
    dispatch : Dispatch<SetStateAction<string[]>>
    thread : string,
    color : string
    textColor : string,
}
 
const Thread: FunctionComponent<ThreadProps> = ({selectedThreads,dispatch,thread,textColor,color}) => {
    const isSelected = selectedThreads.includes(thread)
    return ( <div style={{
        background : color,
        color:textColor
    }} className={`font-semibold w-fit px-4 py-2 rounded-md ${isSelected ? "opacity-100" : "opacity-40"} cursor-pointer duration-200 ease-in-out transition-opacity`} onClick={() => { 
       if (selectedThreads.includes(thread)) { 
            dispatch(selectedThreads.filter((item) => item !== thread))
       } else { 
        dispatch([...selectedThreads,thread])
       }
    }}>{thread}</div> );
}
 
export default Thread;