import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from './Layout'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { CodeFilter, CategoryFilter, NameFilter, QuantityFilter, UnitFilter } from '../components/Filters'
import BarLoader from "react-spinners/BarLoader";
import Add from '../components/Modals/Tickets/Add'
import Edit from '../components/Modals/Tickets/Edit'
import Delete from '../components/Modals/Delete'
import { Toaster } from 'react-hot-toast'
import FloatButton from 'antd/es/float-button'
import { Table } from 'antd';
import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from '@heroicons/react/24/outline'


const Tickets = () => {

  const mainTableCols = [
    {
      title: 'Folio',
      dataIndex: 'folio',
      key: 'folio',
    },
    {
      title: 'Tipo Vale',
      dataIndex: 'tipoVale',
      key: 'tipoVale',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Observacion',
      dataIndex: 'observacion',
      key: 'observacion',
    },
    {
      title: 'Entrego',
      dataIndex: 'entrego',
      key: 'entrego',
    },
    {
      title: 'Recibio',
      dataIndex: 'recibio',
      key: 'recibio',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },

    {
      title: 'Opciones',
      key: 'opciones',
      render: (text, record, index) => <div className="flex items-center">
        <PlusCircleIcon className="cursor-pointer w-5 h-5 mr-4" />
        <PencilSquareIcon className="w-5 h-5 cursor-pointer" onClick={(e) => console.log(record)} />
      </div>
    },
  ]

  const subTableColumns = [
    { title: 'Insumo', dataIndex: 'insumo', key: 'insumo', },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad', },
    {
      title: 'Opciones', key: 'opciones',
      render: (text, record, index) => (
        <div
          className="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110 ">
          <TrashIcon onClick={() => setModals(prev => ({ ...prev, delete: {...prev.delete, isOpen: true, id: `${record.key}-${record.idProducto}-${record.insumo}` } }))} />
        </div>
      ),
    },
  ]

  const [allTickets, setAllTickets] = useState([])
  const [filteredTickes, setFilteredTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [sepRow, setSepRow] = useState([])
  const [modals, setModals] = useState({
    add: { isOpen: false },
    edit: { isOpen: false, product: {} },
    delete: { isOpen: false, id: '', data: {}, url: 'http://localhost:3000/vales/' },
  })
  const [filters, setFilters] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    cantidad: '',
    unidad: ''
  })


  /*  const editDeleteButton = (arr) => {
     return arr.reduce((acc, val) => {
       const ind = acc.findIndex(item => item.folio === val.folio)
       if (ind !== -1) {
         acc.push({
           options: false,
           folio: val.folio,
           tipoVale: val.tipoVale,
           descripcion: val.descripcion,
           observacion: val.observacion,
           entrego: val.entrego,
           recibio: val.recibio,
           codigoInsumo: val.codigoInsumo,
           cantidad: val.cantidad
         });
 
       } else {
         acc.push({
           options: true,
           folio: val.folio,
           tipoVale: val.tipoVale,
           descripcion: val.descripcion,
           observacion: val.observacion,
           entrego: val.entrego,
           recibio: val.recibio,
           codigoInsumo: val.codigoInsumo,
           cantidad: val.cantidad
         });
       };
       return acc
     }, [])
   } */

  const mergeArray = (arr) => {
    return arr.reduce((acc, val) => {
      const ind = acc.findIndex(item => item.folio === val.folio)
      if (ind !== -1) {
        acc[ind].insumos.push({ idProducto: val.folio, key: val.idProducto , insumo: val.codigoInsumo, cantidad: val.cantidad })

      } else {
        acc.push({
          key: val.folio,
          folio: val.folio,
          tipoVale: val.tipoVale,
          descripcion: val.descripcion,
          observacion: val.observacion,
          entrego: val.entrego,
          recibio: val.recibio,
          insumos: [{ idProducto: val.folio, key: val.idProducto, insumo: val.codigoInsumo, cantidad: val.cantidad }]
        });
      };
      return acc
    }, [])
  }

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:3000/vales')
      const data = await response.json()
      const newData = await mergeArray(data).map(ticket => ticket.insumos)
      console.log(mergeArray(data))
      setSepRow(newData)
      setAllTickets(mergeArray(data))
      setFilteredTickets(mergeArray(data))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  /* 
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
   */


  return (
    <Layout>
      <Toaster />
      <Add modals={modals} setModals={setModals} fetchTickets={fetchTickets} />
      <Delete modals={modals} setModals={setModals} fetchData={fetchTickets} texto='El insumo se elimno con exito'/>
      {/*  
      <Edit modals={modals} setModals={setModals} fetchProducts={fetchProducts}/>
       */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6 place-items-center '>
        <CodeFilter setFilters={setFilters} filters={filters} />
        <NameFilter setFilters={setFilters} filters={filters} />
        <CategoryFilter setFilters={setFilters} filters={filters} />
        <QuantityFilter setFilters={setFilters} filters={filters} />
        <UnitFilter setFilters={setFilters} filters={filters} />
        <button onClick={() => setModals(prev => ({ ...prev, add: { isOpen: true } }))} className='bg-indigo-200 hover:bg-indigo-400 font-semibold text-gray-700 hover:text-white rounded-lg px-4 py-2 min-w-fit w-full '>Agregar Vale</button>
      </div>
      <div className='max-w-7xl mx-auto '>
        {
          loading ? (<div className='flex justify-center items-center mt-20'><BarLoader /></div>) : (
            <Table
              columns={mainTableCols}
              pagination={false}
              expa

              expandable={{
                expandedRowRender: (row) => {
                  return <Table className='w-full' columns={subTableColumns} dataSource={row.insumos} pagination={false} />
                },
                expandIcon: ({ expanded, onExpand, record }) =>
                  expanded ? (
                    <ChevronUpIcon className='cursor-pointer' onClick={e => onExpand(record, e)} />
                  ) : (
                    <ChevronDownIcon className='cursor-pointer' onClick={e => onExpand(record, e)} />
                  )
              }

              }

              dataSource={allTickets}
            />
          )
        }
      </div>
      <FloatButton.BackTop />
    </Layout>
  )
}

export default Tickets

/* const mergeArray = (arr) => {
  return arr.reduce((acc, val) => {
    const ind = acc.findIndex(item => item.folio === val.folio)
    if (ind !== -1) {
      acc[ind].insumos.push({insumo: val.codigoInsumo, cantidad: val.cantidad})

    } else {
      acc.push({
        folio: val.folio,
        tipoVale: val.tipoVale,
        descripcion: val.descripcion,
        observacion: val.observacion,
        entrego: val.entrego,
        recibio: val.recibio,
        insumos: [{insumo: val.codigoInsumo, cantidad: val.cantidad}]
      });
    };
    return acc
  }, [])
} */