import { useContext  , createContext, useReducer} from "react";






            // for (var [cUsername,cPasssowrd] of Object.entries(data)){
            //     if ((cUsername === username) && (cPasssowrd === passowrd)){
            //     return {...state , username:action.payload.username , isAuthenticated : true , error : null, tentative:0}
            //     }else {
            //         return {...state ,tentative:state.tentative+1, isAuthenticated:false, error :'username or password are invalid'}
            //      } 
            // }

            // const fakeAuth = {
            //     username :'amine',
            //     password : 'amine123',
            // }
const authContext = createContext()
const initialState = {
    username : null,
    isAuthenticated : false,
    error: null ,
    tentative :0
}

const baseUrl = 'http://localhost:4444/users'
async function fetchData(){
        const res = await fetch(baseUrl)
        const data = await res.json()
        return  data
}
const data = await fetchData()


function reducer(state , action){
    
    function checkAuthentication(username,password ){
        for (var [,credentials ] of Object.entries(data)){
                if ((username === credentials.username) && (password === credentials.passowrd)){
                return true
                }
            }
        return false
    } 
    switch (action.type) {
        case 'auth/login':
            if (checkAuthentication(action.payload.username , action.payload.password)){
                return {...state , username:action.payload.username , isAuthenticated : true , error : null, tentative:0}
            }else{
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
