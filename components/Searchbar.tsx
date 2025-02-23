"use client"


  
import { useDebounce } from "@/hooks/use-debounce"
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import { useEffect, useMemo, useState, useTransition } from "react"
import { queryIssues } from "@/app/actions/query-issues"
import { formatTimeToNow } from "@/lib/utils"
import { Button } from "./ui/button"
import Link from "next/link"
import { ExtendedIssue } from "@/types/issue"
import { useRouter } from "next/navigation"
  
  export function Searchbar() {

    const [input,setInput] = useState<string>("")
    const router = useRouter()
    const debounceValue = useDebounce(input)
    const [results,setResults] =  useState<ExtendedIssue[]>([])
    const [isPending,startTransition] = useTransition()

    useEffect(() => { 

      startTransition(async () => { 

        if (debounceValue === "") { 
          setResults([])
          router.refresh()
          console.log("DATA CHANGED",[])
         
        } else { 
          queryIssues(input,5).then((data) => { 
            setResults(data)
            router.refresh()
            console.log("DATA CHANGED",data)
          })
        }

        
        
      })
      

      
    },[input])




    
    return (
      <Command className="rounded-lg border shadow-md md:min-w-[450px] max-w-[1000px] relative overflow-visible z-20">
        <CommandInput placeholder="What bugs are you facing today ? " value={input} onValueChange={(value) => setInput(value)} />
        <CommandList className={`${debounceValue ? "opacity-100": "opacity-0 pointer-events-none"} absolute top-full w-full transition-opacity duration-200 ease-in-out border-input bg-background border-2 rounded-sm `}>
          <CommandEmpty className="text-center  py-3" >No results found.</CommandEmpty>
          <CommandGroup className="bg-background " >
            {results.map((
              {title,id,createdAt,author}) =>
                <CommandItem className="w-full" key={id}>
                  <Button variant={"link"}><Link href={`/issue/${id}`}>{title} - {author.username} • {formatTimeToNow(createdAt)}</Link></Button>
                  
                </CommandItem>
               )}

          </CommandGroup>
          
        </CommandList>
      </Command>
    )
  }
  