"use client"
// This is my Editorjs component, better if make a seperate component and use it

import React, { useEffect, useRef, useState } from "react";
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

  const ref = useRef<string[]>([]) 
  
  
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        onReady : () => {
          ref.current = []
        },
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
                   
                      }, 
                      file,
                      onProgressChange: (progress) => {
                        // you can use this to show a progress bar
                       
                      },
                    });

                    
                    ref.current = [...ref.current,res.url]
                    
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
        
        async onChange(api,event) {
          const currentImages : string[] = []
          const uploadedImages = ref.current 
          
          document.querySelectorAll('.image-tool__image-picture').forEach((x) => currentImages.push(x.attributes[1].nodeValue!))

          console.log("CURRENT IMAGES",currentImages)
          console.log("UPLOADED IMAGES",uploadedImages)
          if (uploadedImages.length > currentImages.length) {
            uploadedImages.forEach(async (img) => {
              if (!currentImages.includes(img)) {
                await edgestore.publicFiles.delete({ 
                  url : img
                })
              }
              ref.current = uploadedImages.filter((x) => x !== img)
            }
          )

          
        }


      
          const content = await api.saver.save();
          
          onChange(content);
        },
      });
      editorRef.current = editor;
    }

    //add a return function handle cleanup
    return () => {

      

      ref.current.forEach(async (img) => {
        
          await edgestore.publicFiles.delete({ 
            url : img
          })
        
        
      })

      ref.current = []


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