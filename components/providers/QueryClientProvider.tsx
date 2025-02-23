"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";

interface QueryClientProps {
    children : React.ReactNode
}
 
const ReactQueryProvider: FunctionComponent<QueryClientProps> = ({children}) => {
    const queryClient = new QueryClient
    return ( <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> );
}
 
export default ReactQueryProvider;