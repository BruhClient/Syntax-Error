"use client"

import {  useState } from "react";

import SignInForm from "./SignInForm";
import ResettingPasswordForm from "./ResettingPasswordForm";




const SignIn = () => {

    const [isResettingPassword,setIsResettingPassword] = useState(false)
    return <div>
        {isResettingPassword ? <ResettingPasswordForm setIsResettingPassword={setIsResettingPassword}/>: <SignInForm setIsResettingPassword={setIsResettingPassword} />}
    </div>
 };

 
export default SignIn;