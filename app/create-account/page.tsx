import CreateAccountForm from "@/components/auth/CreateAccountForm";


const CreateAccountPage = () => {
    return ( <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen z-[-1] px-7">
        <div className="max-w-[500px] w-full">
            <h1 className="text-center text-[30px]">Create Account</h1>
            <CreateAccountForm />
        </div>
    </div> );
}
 
export default CreateAccountPage;