import Modal from "@/components/auth/Modal";
import SignIn from "@/components/auth/SignIn";
import { DialogTitle } from "@/components/ui/dialog";


const SignInModal = () => {
    return ( <Modal>
        <DialogTitle className="text-center text-[30px]">Sign in</DialogTitle>
     
        <SignIn />
      
        
    </Modal> );
}
 
export default SignInModal;