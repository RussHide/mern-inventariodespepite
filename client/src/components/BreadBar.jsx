import Breadcrumb from 'antd/es/breadcrumb';
import { Link } from 'react-router-dom';

const BreadBar = () => {
    return (
        <div className='container mx-auto flex justify-center items-center mt-5 mb-5 text-xl'>
            <Link to='/' className='text-gray-400 font-semibold hover:text-black '>Inicio</Link>
            <p className='text-gray-400 mx-2'>/</p>
            <Link to='/insumos' className='text-gray-400 font-semibold hover:text-black'>Insumos</Link>
            <p className='text-gray-400 mx-2'>/</p>
            <Link to='/vales' className='text-gray-400 font-semibold hover:text-black'>Vales</Link>
        </div>
    )
}

export default BreadBar