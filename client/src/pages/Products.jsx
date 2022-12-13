import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from './Layout'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import TableRow from '../components/TableRow';
import { CodeFilter, CategoryFilter, NameFilter, QuantityFilter, UnitFilter } from '../components/Filters'
import BarLoader from "react-spinners/BarLoader";
import Add from '../components/Modals/Products/Add'
import { Toaster } from 'react-hot-toast'


const Products = () => {

  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modals, setModals] = useState({
    add: {isOpen: false},
    edit: {isOpen: false, product: {}},
    delete: {isOpen: false, idProductDelete: ''},
  })
  const [filters, setFilters] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    cantidad: '',
    unidad: ''
  })

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/insumos')
      const data = await response.json()
      setAllProducts(data)
      setFilteredProducts(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  useEffect(() => {
    if (filters.categoria === 'x') return setFilters(prev => ({ ...prev, categoria: '' }))
    if (filters.unidad === 'x') return setFilters(prev => ({ ...prev, unidad: '' }))
    if (filters.cantidad === 'x') return setFilters(prev => ({ ...prev, cantidad: '' }))

    setFilteredProducts(allProducts.filter(product => {
      for (const [key, value] of Object.entries(filters)) {
        if (key === 'codigo' || key === 'nombre') {
          if (value !== "" && !product[key].toLocaleLowerCase().includes(value.toLocaleLowerCase())) return false;
        } else if (key === 'cantidad') {
          if (value !== "" && !(product[key] >= value.split('-')[0] && product[key] <= value.split('-')[1])) return false;
        } else {
          if (value !== "" && !product[key].includes(value)) return false;
        }
      }
      return true;
    }))
  }, [filters])


  return (
    <Layout>
      <Toaster/>
      <Add modals={modals} setModals={setModals}/>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-3 mb-6 place-items-center '>
        <CodeFilter setFilters={setFilters} filters={filters} />
        <NameFilter setFilters={setFilters} filters={filters} />
        <CategoryFilter setFilters={setFilters} filters={filters} />
        <QuantityFilter setFilters={setFilters} filters={filters} />
        <UnitFilter setFilters={setFilters} filters={filters} />
        <button onClick={() => setModals(prev => ({...prev, add:{isOpen: true}}))} className='bg-indigo-200 hover:bg-indigo-400 font-semibold text-gray-700 hover:text-white rounded-lg px-4 py-2 min-w-fit w-full '>Agregar Insumo</button>
      </div>
      <div className='max-w-7xl '>
        {
          loading ? (<div className='flex justify-center items-center mt-20'><BarLoader/></div>) : (
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Codigo</th>
                  <th className="py-3 px-6 text-left">Nombre</th>
                  <th className="py-3 px-6 text-left">Categoria</th>
                  <th className="py-3 px-6 text-left">Cantidad</th>
                  <th className="py-3 px-6 text-left">Unidad</th>
                  <th className="py-3 px-6 text-left">Opciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {
                  filteredProducts.map((product) => (
                    <tr key={product.idProducto} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                      <TableRow texto={product.idProducto} />
                      <TableRow texto={product.codigo} />
                      <TableRow texto={product.nombre} />
                      <TableRow texto={product.categoria} />
                      <TableRow texto={product.cantidad} />
                      <TableRow texto={product.unidad} />
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            className="w-4 mr-2 transform hover:text-blue-500 cursor-pointer hover:scale-110">
                            <PencilSquareIcon onClick={() => setOpenEdit(prev => ({ ...prev, open: true, alumno: alumno }))} />
                          </div>
                          <div
                            className="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110">
                            <TrashIcon onClick={() => setOpenDelete(prev => ({ ...prev, open: true, claveBorrar: alumno.matricula }))} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
    </Layout>
  )
}

export default Products