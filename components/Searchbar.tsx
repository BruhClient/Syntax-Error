"use client"

  
  import {
    Command,
    CommandEmpty,

    CommandGroup,

    CommandList,
    CommandItem

  } from "@/components/ui/command"
import { Input } from "./ui/input"
import {  useEffect, useMemo, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useQuery } from "@tanstack/react-query"

import { queryIssues } from "@/app/actions/query-issues"
import { ExtendedIssue } from "@/types/issue"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { formatTimeToNow } from "@/lib/utils"
import { useRouter } from "next/navigation"
  
  export function Searchbar() {
    const [input,setInput] = useState<string>("")
    const router = useRouter()
    const debounceValue = useDebounce(input)

    const {
      refetch , 
      data
    } = useQuery({
      queryFn : async () => { 
        if (!input) return []
        const data = await queryIssues(input,5)
        return data as ExtendedIssue[]
      }, 
      queryKey : ['search-query'], 

    })

    useEffect(() => { 
      refetch()
    },[debounceValue,refetch])

    
    const query = useMemo(() => { 
      if (!data) return []
      return data as ExtendedIssue[]
    },[data])


    
    return (
      <Command className=" relative overflow-visible flex-1 bg-transparent flex items-center max-w-[800px]">
        <Input onChange={(e) => {
            setInput(e.target.value)
        }} value={input} placeholder="Search for users ..."  />
        <CommandList className={`absolute top-10 w-full bg-background border-input border-2 rounded-lg ${debounceValue ? "block": "hidden" }  duration-200 ease-in-out transition-opacity z-50`}>
          <CommandEmpty >No results found.</CommandEmpty>
          <CommandGroup>
            {query?.map((issue) => {
              return <CommandItem key={issue.id} className="flex items-center font-nokora " >
                <Button variant={"link"} onClick={() => {
                  router.push(`/issue/${issue.id}`)
                  setInput("")
                }

                  } >
                  
                  {issue.title} - <Avatar className="w-6 h-6">
                    <AvatarImage src={issue.author.image} alt="profile" ></AvatarImage>
                      <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>{issue.author.username} • {formatTimeToNow(issue.createdAt)}
                </Button>
                 
                
                </CommandItem>
            })}
          </CommandGroup>
          
          
          
        </CommandList>
      </Command>
    )
  }
  