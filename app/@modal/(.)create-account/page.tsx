import CreateAccountForm from "@/components/auth/CreateAccountForm";
import Modal from "@/components/auth/Modal";
import { DialogTitle } from "@/components/ui/dialog";

const CreateAccountModal = () => {
    return ( <Modal>
        <DialogTitle className="text-center text-[30px]">Create Account</DialogTitle>
        <CreateAccountForm />
    </Modal> );
}
 
export default CreateAccountModal;