import Breadcrumb from 'antd/es/breadcrumb';
import { Link, useLocation } from 'react-router-dom';

const BreadBar = () => {
    const location = useLocation()
    console.log();
    return (
        <div className='container mx-auto flex justify-center items-center mt-5 mb-5 text-xl'>
            <Link to='/' className={`${location.pathname === '/' ? 'text-black' : 'text-gray-400'} font-semibold hover:text-black `}>Inicio</Link>
            <p className='text-gray-400 mx-2'>/</p>
            <Link to='/insumos' className={`${location.pathname === '/insumos' ? 'text-black' : 'text-gray-400'} font-semibold hover:text-black `}>Insumos</Link>
            <p className='text-gray-400 mx-2'>/</p>
            <Link to='/vales' className={`${location.pathname === '/vales' ? 'text-black' : 'text-gray-400'} font-semibold hover:text-black `}>Vales</Link>
        </div>
    )
}

export default BreadBar