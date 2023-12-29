import { Link } from "react-router-dom" ;


function Link_({to , children}) {
    return (
            <Link className='primary-btn' to={to}>{children}</Link>

    )
}

export default Link_
