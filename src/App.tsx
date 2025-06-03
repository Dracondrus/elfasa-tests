
import { Suspense ,lazy} from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css"

const RootRouter = lazy(() => import("./routing/root/RootRouter"));

function App() {


  return (

    
          <BrowserRouter>
            <Suspense fallback={"Loading"}>
              <RootRouter />
            </Suspense>
          </BrowserRouter>
   

  )
}

export default App
