import { useNavigate } from "react-router-dom"
import { useQuestions } from "../context/questionsContext"

import Section from "../components/Section"
import Button from "../components/Button"

function Result() {
    const {stateQuestions ,dispatch} = useQuestions()
    const navigate = useNavigate()

    function handleOnClick(){
        dispatch({type:'clear'})
        navigate('/quiz' , {replace:true})
        
    }
    return (
        <main className="result">
            <Section className="container">
                <p>
                    Your Have Scored : {stateQuestions.points} !
                </p>
                <Button className="primary-btn" onclick={handleOnClick}>Restart</Button>
            </Section>
        </main>
    )
}

export default Result
