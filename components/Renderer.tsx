"use client"

import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";



const EditorJsRenderer = dynamic(
    async () => (await import('editorjs-react-renderer')).default,
    { ssr: false }
  );





interface RendererProps {
    data : any
}


function CustomCodeRenderer ({data} : any) { 
   

    return ( 
        <pre className="bg-input rounded-md p-4 my-3 overflow-auto">
            <code className="text-foreground text-sm">{data.code}</code>
        </pre>
    )
}


function CustomImageRenderer ({data} : any) { 
   
    const source = data.file.url

    return ( 
        <div className="relative w-full min-h-[15rem] my-2">
        
            <Image alt="image" className="object-contain " fill src={source}/> 
        </div>
    )
}



const CustomListRenderer = ({ data } : any) => {
    
    const { style, items } = data;
   
    return (

        <div className="my-4 px-6">
            {style === "ordered" && (
                <ol className="list-decimal ">
                {items.map((item : any, index : number)  => (
                    <li
                    key={index}
                    
                    dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                ))}
                </ol>
            ) } 
            {style === "unordererd" && (
                <ul className="list-disc ">
                {items.map((item : any, index : number)  => (
                    <li
                    key={index}
                    
                    dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                ))}
                </ul>
            ) } 

            {style === "checklist" && (
                <>
                    {
                        items.map((item :any,index : number) => { 
                            return <div  key={index} className="flex item gap-2 items-center"><Checkbox disabled checked={item.meta.checked} />{item.content}</div>
                        })
                    }
                </>
            ) } 
            
            
        </div>
    )
  };
  
  const renderers = { 
    
    code : CustomCodeRenderer, 
    list : CustomListRenderer, 
    image : CustomImageRenderer,
    linkTool : CustomListRenderer

  
}

 
const Renderer: FunctionComponent<RendererProps> = ({data}) => {
        
        return <EditorJsRenderer  data={ data } renderers={renderers}/>
      
}
 
export default Renderer;