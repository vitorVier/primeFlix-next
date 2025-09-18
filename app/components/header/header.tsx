import Link from 'next/link';
import './header.css';

function Header() {
    return(
        <header>
            <Link className='Logo' href='/' >PRIME<span>FLIX</span></Link>
            <Link className='favoritos' href='/favorites' >Meus Filmes</Link>
        </header>
    );
}

export default Header;