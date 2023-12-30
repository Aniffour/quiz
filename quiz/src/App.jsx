import { BrowserRouter  , Routes , Route   } from "react-router-dom"
import { Suspense, lazy } from "react";

import { AuthProvider  } from "./context/authContext";
import { QuestionsProvider } from "./context/questionsContext";

// import Home from "./pages/Home";
// import Quiz from "./pages/Quiz";
// import Login from "./pages/Login";
import './style/app.css'
// import Result from "./pages/Result";

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
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QuestionsProvider>
    </AuthProvider>
      
    
  )
}

export default App
