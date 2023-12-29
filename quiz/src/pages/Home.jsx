import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../context/authContext'
import Link_ from '../components/Link'
import Header from '../components/Header'
import Section from '../components/Section'


function Home() {
    const {stateAuth} = useAuth()


    return  <main className='home'>
        <Section className='container'>
                <Header>
                    <h1>Quiz</h1>
                    <picture className="logo">
                        <FontAwesomeIcon icon={faListCheck} />
                    </picture>
                </Header>
                <Link_ to={stateAuth.isAuthenticated ? 'quiz' :'login'} >get Started</Link_>
        </Section>
        </main>
    
}

export default Home