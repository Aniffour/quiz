import {  useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

import Answer from "../components/Answer"
import { useEffect, useState } from "react"
import { useQuestions } from "../context/questionsContext"
import Header from "../components/Header"
import Section from "../components/Section"
import Button from "../components/Button"
import Counter from "../components/Counter"

const BASE_URL = 'http://localhost:8000/questions'


function Quiz() {
    const navigate = useNavigate()
    const [showResult , setShowResult] = useState(false)
    const [choseValidAnswer , setChoseValidAnswer] = useState(false)
    
    const {stateAuth} = useAuth()
    const {stateQuestions , dispatch} = useQuestions()

    function handleNextBtn(){
        dispatch({type:'getQuestion' })
        setShowResult(false)
    }

    function handleFinishBtn(){
        choseValidAnswer && dispatch({type:'addPoints'  })
        setShowResult(false)
        setChoseValidAnswer(false)
        navigate('/result' , {replace:true})
    }

    useEffect(
        ()=>{
            async function getQuestions(url){
                const res = await fetch(url)
                const data = await res.json()
                await dispatch({type:'setup' , payload : {questions: data }})
                await dispatch({type:'getQuestion'})
            }
            if (stateAuth.isAuthenticated) getQuestions(BASE_URL)
        },[BASE_URL ])


    useEffect(
        ()=>{if (!stateAuth.isAuthenticated ) return navigate('/login' , {replace:true}) }
        , [stateAuth.isAuthenticated , navigate]
    )

    useEffect(
    function () {
      if (stateQuestions.secondsRemaining ===0){
            alert('time finish')
            setShowResult(false)
            setChoseValidAnswer(false)
            return  navigate('/result' , {replace:true})
      }
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch , stateQuestions.secondsRemaining ,navigate]
   );

    useEffect(function(){
        choseValidAnswer && dispatch({type:'addPoints' })
        setChoseValidAnswer(false)
    },[choseValidAnswer  ,dispatch])

  const mins = Math.floor(stateQuestions.secondsRemaining / 60);
  const seconds = stateQuestions.secondsRemaining % 60;
    return (
        <main className="quiz">
            <div className="container">
                <Header>
                    <Counter mins={mins} seconds={seconds}/>
                    <Button className="back" onclick={()=>navigate(-1)}>&larr;</Button>
                    <progress className="progress" value={showResult ? stateQuestions.currentIndex : stateQuestions.currentIndex-1} max={stateQuestions.numberOfQuestion}></progress>
                    <h1>Question {stateQuestions.currentIndex}/{stateQuestions.numberOfQuestion} :</h1>
                </Header>
            <Section>
                <Header>
                    <p>{stateQuestions.question} :</p>
                </Header>
                <Answer answers={stateQuestions.answers} showResult={showResult} setShowResult={setShowResult} setValidAnswer={setChoseValidAnswer} validAnswer={stateQuestions.correctAnswer} />
                {showResult ? stateQuestions.currentIndex  === stateQuestions.numberOfQuestion ? <Button className="primary-btn" onclick={handleFinishBtn}>finish</Button>: <Button className="primary-btn" onclick={handleNextBtn}>next</Button> : ''}
            </Section>
            </div>
        </main>
    )
}

export default Quiz
