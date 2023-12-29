import { faL } from "@fortawesome/free-solid-svg-icons"

function Answer({answers,  validAnswer , showResult , setShowResult , setValidAnswer}) {
    function handleOnClick( e,index){
        setShowResult(true)
        if (index === validAnswer ){
            return setValidAnswer(true)
        }
        return setValidAnswer(false)
    }

    return (
        <>
            {answers.map(
                (a , i)=>{
                    return <button onClick={(e)=>handleOnClick(e,i)} disabled={showResult} key={i} className={`answer ${(showResult && validAnswer === i) ? 'correct' : (showResult && validAnswer !==i ) ? 'notCorrect' : '' }`} >{a}</button>
                }
            )}
        </>
    )
}

export default Answer
