import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className='navbar-container'>
            <div className='navbar-box'>
                <div className='navbar-logo'>
                <Link to="/">
                    <img src={require('../../assets/Images/logo.png')} alt='Logo'/>
                    </Link>
             
                </div>
                <div className="navbar-button">
                <Link to="/registrarse-profesional">

                        ¿Eres profesional de Salud?
                        </Link>

                        <Link to="/registrarse-empresa">

                    ¿Es usted una empresa?
                  
                    </Link>
                    <Link to="/iniciar-sesión">

                    <button>
                       INICIAR SESIÓN
                    </button>
                    </Link>

                </div>
            </div>

        </div>
    )
}