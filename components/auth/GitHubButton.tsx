import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

 
const GithubButton = () => {
    return ( 
        <Button  size={"icon"} onClick={() => signIn("github")}><FaGithub /></Button>
     );
}
 
export default GithubButton;