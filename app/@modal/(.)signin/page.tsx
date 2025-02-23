import Modal from "@/components/auth/Modal";
import SignInForm from "@/components/auth/SignInForm";
import { DialogTitle } from "@/components/ui/dialog";
import { Suspense } from "react";

const SignInModal = () => {
    return ( <Modal>
        <DialogTitle className="text-center text-[30px]">Sign in</DialogTitle>
        <Suspense>
            <SignInForm />
        </Suspense>
        
    </Modal> );
}
 
export default SignInModal;