import SignIn from "@/components/auth/SignIn";


const SignInPage= () => {
    return ( <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen z-[-1] px-7">
            <div className="max-w-[500px] w-full">
                <h1 className="text-center text-[30px]">Sign In</h1>
              
                <SignIn />
               
                
            </div>
        </div> );
}
 
export default SignInPage;