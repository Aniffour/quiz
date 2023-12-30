import { BrowserRouter  , Routes , Route   } from "react-router-dom"
import { Suspense, lazy } from "react";

import { AuthProvider  } from "./context/authContext";
import { QuestionsProvider } from "./context/questionsContext";

import './style/app.css'

const Home  = lazy(()=>  import("./pages/Home"))
const Login  = lazy(()=>  import("./pages/Login"))
const Quiz  = lazy(()=>  import("./pages/Quiz"))
const Result  = lazy(()=>  import("./pages/Result")
)

function App() {
  


  return (
    <AuthProvider>
      <QuestionsProvider>
        <BrowserRouter>
          <Suspense fallback={<main>Loading...</main>}>
            <Routes>
              <Route  index element={<Home/>}/>
              <Route  path="login" element={<Login/>}/>
              <Route  path="quiz" element={<Quiz/>}/>
              <Route  path="result" element={<Result/>}/>
              <Route  path="*" element={<main>Page Note Found ☹</main>}/>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QuestionsProvider>
    </AuthProvider>
      
    
  )
}

export default App
