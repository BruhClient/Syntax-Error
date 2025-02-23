"use client"
import dynamic from 'next/dynamic';



const CreatePage = () => {

    const CreateNewIssue = dynamic(
        () => import('@/components/CreateIssuePost'),
        { ssr: false }
      );

    return ( <div><CreateNewIssue /></div> );
}
 
export default CreatePage;