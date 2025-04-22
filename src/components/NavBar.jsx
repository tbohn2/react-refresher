import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/form'>Form</Link>
            <Link to='/list'>List</Link>
            <Link to='/countrySearch'>Country Search</Link>
        </nav>
    )
}

export default NavBar;