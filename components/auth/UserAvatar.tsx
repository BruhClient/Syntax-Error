"use client"


import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Crown, User } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSessionUser } from "@/hooks/use-session";
import EditProfileDialog from "../EditProfile";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { UserRole } from "@prisma/client";
import PremiumButton from "../PremiumButton";
import { cn } from "@/lib/utils";

 
const UserAvatar= () => {
    const router = useRouter()

    const user= useSessionUser()
   
   
    return ( <DropdownMenu>
        <DropdownMenuTrigger className="outline-none border-none">

            {user?.image ? <Avatar className="w-14 h-14">
                <AvatarImage src={user.image}  className="object-cover " alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar> 
    
            : <User size={30}/>}
            
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[300px] ">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuLabel className="flex items-center gap-2">{user ? user?.username : "You are not logged in"} {user?.role === UserRole.ADMIN && <Crown size={20}/>}</DropdownMenuLabel>
            
            
            <DropdownMenuSeparator /> 
            <DropdownMenuGroup>
                
                <DropdownMenuItem onClick={() => router.push("/")}>
                    Forum
                </DropdownMenuItem>

                
                

                {!user && <><DropdownMenuItem onClick={() => router.push("/signin")}>
                    Sign in
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/create-account")}>
                    Create Account
                </DropdownMenuItem></> }
                
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator /> 
            <DropdownMenuGroup>
                {user && 
                <>
                    <EditProfileDialog initialEmail={user?.email!} initialImage={user?.image} initialUsername={user?.username!} />
                    <DropdownMenuItem onClick={() => router.push("/create")}>Post an Issue</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/user/${user.id}`)}>Your Issues</DropdownMenuItem>
                    
                </> }
                <DropdownMenuItem onClick={() => router.push("/create")} >Terms and Conditions</DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator /> 
            <DropdownMenuGroup className="flex w-full justify-between p-2">
                {user && <div className="flex gap-2">
                    <Button onClick={() => signOut()}>Log out</Button>
                    {user.isPremium ? <a href={"https://billing.stripe.com/p/login/test_bIY9DPgQ109G7ew8ww?prefilled_email=" + user.email} target="_blank" className={cn(buttonVariants({variant : "secondary"}))}>Billing</a>: <PremiumButton />}
                </div>}
                
                <ModeToggle />
            </DropdownMenuGroup>
           
        </DropdownMenuContent>

        
    </DropdownMenu> );
}
 
export default UserAvatar;