import { FunctionComponent } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { EdgeStoreProvider } from "./EdgestoreProvider";
import ReactQueryProvider from "./QueryClientProvider";
interface MainProviderProps {
    children : React.ReactNode
}
 
const MainProvider: FunctionComponent<MainProviderProps> = ({children}) => {
    return ( <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            <SessionProvider>
                <EdgeStoreProvider>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </EdgeStoreProvider>
                
            </SessionProvider>
        
    </ThemeProvider> );
}
 
export default MainProvider;