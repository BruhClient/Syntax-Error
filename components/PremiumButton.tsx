"use client"

import { FunctionComponent, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { number } from "zod";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSessionUser } from "@/hooks/use-session";

export const plans = [

    { 
        link : process.env.NODE_ENV === "development" ? "https://buy.stripe.com/test_9AQg2xbr2cWa4rSeUU" : "",
        priceId : process.env.NODE_ENV === "development" ? "price_1QwJBh4dBCYaxxsADvLTifXA" : "",
        price : 10, 
        duration:"/month"
        

    },
    { 
        link : process.env.NODE_ENV === "development" ? "https://buy.stripe.com/test_cN29E98eQ6xMf6wcMN" : "",
        priceId : process.env.NODE_ENV === "development" ? "price_1QwJFd4dBCYaxxsAhqOTpG5u" : "",
        price : 99, 
        duration:"/year"
        

    }
]
interface PremiumButtonProps {
    
}
 


const PremiumButton: FunctionComponent<PremiumButtonProps> = () => {

    const [plan,setPlan] = useState(plans[0])
    const user = useSessionUser()
  
    return ( <Dialog>
        <DialogTrigger asChild>
            <Button variant={"shiny"}>Upgrade</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Buy Premium</DialogTitle>
            <DialogDescription>Premium members get special perks</DialogDescription>
            <RadioGroup defaultValue="0" className="flex" onValueChange={(value) => setPlan(plans[Number(value)])}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="r1" />
                    <Label htmlFor="r1">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r2" />
                    <Label htmlFor="r2">Yearly{" ( 20% Off ! )"}</Label>
                </div>
                
            </RadioGroup>
            
                <div className="flex flex-col gap-6">
                <div>
                    <span className="text-4xl font-bold pr-1">${plan.price}</span>{plan.duration}
                </div>

                <div className="flex flex-col gap-2 text-md">
                    <div className="flex gap-2 items-center"><Check/>100GB Image Storage</div>
                    <div className="flex gap-2 items-center"><Check/>Early Access</div>
                    <div className="flex gap-2 items-center"><Check/>More Customisation of Issues</div>
                    <div className="flex gap-2 items-center"><Check/>24/7 support</div>

                   
                    
                </div>
                <a target="_blank" href={plan.link + "?prefilled_email=" + user?.email} className={cn(buttonVariants({variant : "shiny"}))}>Get Premium</a>
                </div>
                
                
            
        </DialogContent>
    </Dialog> );
}
 
export default PremiumButton;