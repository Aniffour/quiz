import { createContext, useContext, useReducer } from "react"

const  quetionsContext= createContext()
const initialData = {
    questions:[],
    question : '',
    answers:[],
    correctAnswer : '',
    currentIndex : 0 ,
    numberOfQuestion:0,
    totalPoints:0,
    points:0,
    secondsRemaining:null,
}
function reducer(state , action){
    
    switch (action.type) {
        case 'setup' : 
            return {...initialData ,questions:action.payload.questions , numberOfQuestion : action.payload.questions.length, totalPoints:action.payload.questions.length*10  , secondsRemaining:action.payload.questions.length * 30 , currentIndex:0 }
        case 'getQuestion':
            return {...state,currentIndex : state.currentIndex +1, question : state.questions[state.currentIndex ].question  , correctAnswer:state.questions[state.currentIndex ].correctOption , answers:state.questions[state.currentIndex ].options   }
        case 'addPoints':
            return {...state , points :  state.points + state.questions[state.currentIndex - 1].points}
        case 'clear':
            return initialData
        case 'tick':
            return {...state , secondsRemaining : state.secondsRemaining-1 }
        default :
            throw new Error('type invalid')
        }
}


function QuestionsProvider({children}) {
    
    const [stateQuestions , dispatch] = useReducer(reducer,initialData )

    return (
        <quetionsContext.Provider value={{stateQuestions , dispatch}}>
            {children}
        </quetionsContext.Provider>
    )
}

function useQuestions(){
    const context = useContext(quetionsContext)
    if (context === undefined) throw new Error('AuthContext was used outside AuthProvider')
    return context
}

export {QuestionsProvider , useQuestions}
