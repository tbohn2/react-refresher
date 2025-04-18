import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/form'>Form</Link>
            <Link to='/list'>List</Link>
        </nav>
    )
}

export default NavBar;