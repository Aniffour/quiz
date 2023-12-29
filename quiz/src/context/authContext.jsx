import { useContext  , createContext, useReducer} from "react";

const authContext = createContext()
const fakeAuth = {
    username :'amine',
    password : 'amine123',
}
const initialState = {
    username : null,
    isAuthenticated : false,
    error: null ,
    tentative :0
}
function reducer(state , action){

    switch (action.type) {
        case 'auth/login':
            if (action.payload.username === fakeAuth.username && action.payload.password === fakeAuth.password){
                return {...state , username:action.payload.username , isAuthenticated : true , error : null, tentative:0}
            }else {
                return {...state ,tentative:state.tentative+1, isAuthenticated:false, error :'username or password are invalid'}
            } 
        case 'auth/logout':
            return {...initialState}
        case 'cleanErrors':
            return {...state , error:null}
        default:
            throw new Error('invalid type')
    }
}

function AuthProvider({ children }) {

    const [stateAuth , dispatch] = useReducer(reducer,initialState)
    return <authContext.Provider value={{stateAuth , dispatch}}>
        {children}
    </authContext.Provider>
}


function useAuth(){
    const context = useContext(authContext)
    if (context === undefined) throw new Error('AuthContext was used outside AuthProvider')
    return context
}
export  {AuthProvider , useAuth} ;
