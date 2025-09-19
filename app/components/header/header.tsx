import Link from 'next/link';
import './header.css';

function Header() {
    return(
        <header>
            <div>
                <Link className='Logo' href='/' >PRIME<span>FLIX</span></Link>
                <Link className='favoritos' href='/favorites' >Meus Filmes</Link>
            </div>
        </header>
    );
}

export default Header;