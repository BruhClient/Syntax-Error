"use client"

import { FunctionComponent, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfilePayload, EditProfileSchema } from "@/schema/EditProfileSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { editProfile } from "@/app/actions/edit-profile";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { SingleImageDropzone } from "./ProfileImageUploader";
import { useEdgeStore } from "./providers/EdgestoreProvider";
import { useRouter } from "next/navigation";


interface EditProfileDialogProps {
    initialImage : string | undefined , 
    initialEmail : string, 
    initialUsername : string ,
}
 
const EditProfileDialog: FunctionComponent<EditProfileDialogProps> = ({initialEmail,initialImage,initialUsername}) => {

    
    
    const form = useForm<EditProfilePayload>({ 
        resolver : zodResolver(EditProfileSchema),
        defaultValues: { 
            username : initialUsername, 
       
            image: initialImage
        } 
        
    })

    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();

    const {update} = useSession()
    const router = useRouter()
    const [isPending,startTransition] = useTransition()
    const {toast} = useToast()
    function onSubmit(values: EditProfilePayload) {
            

            startTransition(async () => {
                

                
                if (file) {

                    if (initialImage) { 

                        if (initialImage.includes("files.edgestore.dev")) { 
                            await edgestore.publicFiles.delete({
                                url: initialImage,
                            });
                        }
                        
                    }

                    const res = await edgestore.publicFiles.upload({
                        input : {
                            type : 'profile'
                        },
                      file,
                      onProgressChange: (progress) => {
                        // you can use this to show a progress bar
                       
                      },
                    });
                    
                    values.image = res.url
                    }

                   

                
                editProfile(values,initialEmail).then((data) => { 
                    if (data.error) { 
                        toast({ 
                            title : data.error, 
                            variant : "destructive"
                        })
                    }else if (data.success) { 
                        toast({ 
                            title : data.success
                        })
                    }
                    update()  
                    router.refresh()
                })
            })


            
            
    
          }
    return ( <Dialog>
        <DialogTrigger className="w-full" asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit Profile
            </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Edit Profile</DialogTitle>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                

                <div className="flex items-center justify-center w-full">
                <SingleImageDropzone
                        placeholderImage ={initialImage}
                        width={200}
                        height={200}
                        value={file}
                        onChange={(file) => {
                        setFile(file);
                        }}
                />
                </div>
                
                       
                    <FormField
                control={form.control}
                name ="username"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Username
                        </FormLabel>
                        <FormControl>
                            <Input {...field}  />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    
                )}

                
            />
                <Button disabled={isPending} className="w-full"> {isPending ? "Loading..." : "Save Changes" }</Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog> );
}
 
export default EditProfileDialog;