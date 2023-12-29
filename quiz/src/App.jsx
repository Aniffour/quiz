import { BrowserRouter , Routes , Route  } from "react-router-dom"

import { AuthProvider  } from "./context/authContext";
import { QuestionsProvider } from "./context/questionsContext";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";

import Login from "./pages/Login";
import './style/app.css'
import Result from "./pages/Result";

function App() {
  


  return (
    <AuthProvider>
      <QuestionsProvider>
        <BrowserRouter>
          <Routes>
            <Route  index element={<Home/>}/>
            <Route  path="login" element={<Login/>}/>
            <Route  path="quiz" element={<Quiz/>}/>
            <Route  path="result" element={<Result/>}/>
          </Routes>
        </BrowserRouter>
      </QuestionsProvider>
    </AuthProvider>
      
    
  )
}

export default App
