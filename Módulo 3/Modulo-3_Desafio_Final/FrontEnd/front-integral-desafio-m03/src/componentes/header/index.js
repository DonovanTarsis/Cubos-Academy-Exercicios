import './style.css';

import logo from '../.././assets/logo.svg';

function Header() {
    return (
        <header className="container-header">
            <img className="logo" src={logo} alt="logo" />
        </header>
    )
}

export default Header;