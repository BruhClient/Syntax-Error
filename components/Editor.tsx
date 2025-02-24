"use client"
// This is my Editorjs component, better if make a seperate component and use it

import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Code from "@editorjs/code";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
import ImageTool from '@editorjs/image';
import { useEdgeStore } from "./providers/EdgestoreProvider";
import LinkTool from "@editorjs/link";

function Editor({ data, onChange, holder,editorRef,placeholder="Start writting here.." } : {data : any , onChange : any, holder : string , editorRef : any , placeholder? : string }) {
  //add a reference to editor
  
  const { edgestore } = useEdgeStore();
  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: placeholder,
        tools: {
            header: Header ,
            code: Code,
            list: List,
            inlineCode: InlineCode,
            paragraph:Paragraph, 
            linkTool : { 
              class: LinkTool,
              config: {
                endpoint: '/api/link', // Your backend endpoint for url data fetching,
              }
            },
            image : { 
              class : ImageTool, 
              config : { 
                uploader : { 
                  async uploadByFile(file : File) { 
                    
                    const res = await edgestore.publicFiles.upload({
                      input : { 
                        type : "issue"
                      }, 
                      options : { 
                        temporary : true
                      }, 
                      file,
                      onProgressChange: (progress) => {
                        // you can use this to show a progress bar
                       
                      },
                    });

                    return {
                      success: 1,
                      file: {
                        url: res.url,
                        // any other image data you want to store, such as width, height, color, extension, etc
                      }
                    }
                  }, 
                  uploadByUrl(url : string) { 
                    
                  }
                }
              }
            } 


        
        }
            
            , 
        data,
        async onChange(api, event) {
          const content = await api.saver.save();
        
          onChange(content);
        },
      });
      editorRef.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div
        id={holder}
        
      />
    </>
  );
}

export default Editor;