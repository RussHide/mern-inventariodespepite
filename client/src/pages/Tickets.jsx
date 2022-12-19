import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from './Layout'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import TableRow from '../components/TableRow';
import { CodeFilter, CategoryFilter, NameFilter, QuantityFilter, UnitFilter } from '../components/Filters'
import BarLoader from "react-spinners/BarLoader";
import Add from '../components/Modals/Tickets/Add'
import Edit from '../components/Modals/Tickets/Edit'
import Delete from '../components/Modals/Delete'
import { Toaster } from 'react-hot-toast'
import FloatButton from 'antd/es/float-button'

import { Badge, Dropdown, Row, Space, Table } from 'antd';
import { merge } from 'antd/es/theme/util/statistic'

const tableColumns = [
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
    render: () => <a>Publish</a>,
  },
];

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];
const Tickets = () => {

  const [allTickets, setAllTickets] = useState([])
  const [filteredTickes, setFilteredTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [sepRow, setSepRow] = useState([])
  const [modals, setModals] = useState({
    add: { isOpen: false },
    edit: { isOpen: false, product: {} },
    delete: { isOpen: false, id: '' },
  })
  const [filters, setFilters] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    cantidad: '',
    unidad: ''
  })

  const editDeleteButton = (arr) => {
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
  }

  const subTableColumns = [
    {
      title: 'Insumo',
      dataIndex: 'insumo',
      key: 'insumo',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Opciones',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <a>Pause</a>
          <a>Stop</a>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a>
              More +
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const mergeArray = (arr) => {
    return arr.reduce((acc, val) => {
      const ind = acc.findIndex(item => item.folio === val.folio)
      if (ind !== -1) {
        acc[ind].insumos.push({ key: val.folio, insumo: val.codigoInsumo, cantidad: val.cantidad })

      } else {
        acc.push({
          key: val.folio,
          folio: val.folio,
          tipoVale: val.tipoVale,
          descripcion: val.descripcion,
          observacion: val.observacion,
          entrego: val.entrego,
          recibio: val.recibio,
          insumos: [{ key: val.folio, insumo: val.codigoInsumo, cantidad: val.cantidad }]
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
  const expandedRowRender = (row) => {
    console.log(row);
    const inTable = sepRow[Row.key]

    return <Table columns={subTableColumns} dataSource={row.insumos} pagination={false} />;
  }


  return (
    <Layout>
      <Toaster />
      <Add modals={modals} setModals={setModals} fetchTickets={fetchTickets} />
      {/*  
      <Edit modals={modals} setModals={setModals} fetchProducts={fetchProducts}/>
      <Delete modals={modals} setModals={setModals} fetchProducts={fetchProducts} texto='El insumo se elimno con exito'/> */}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6 place-items-center '>
        <CodeFilter setFilters={setFilters} filters={filters} />
        <NameFilter setFilters={setFilters} filters={filters} />
        <CategoryFilter setFilters={setFilters} filters={filters} />
        <QuantityFilter setFilters={setFilters} filters={filters} />
        <UnitFilter setFilters={setFilters} filters={filters} />
        <button onClick={() => console.log(sepRow)} className='bg-indigo-200 hover:bg-indigo-400 font-semibold text-gray-700 hover:text-white rounded-lg px-4 py-2 min-w-fit w-full '>Agregar Vale</button>
      </div>
      <div className='max-w-7xl mx-auto '>
        {
          loading ? (<div className='flex justify-center items-center mt-20'><BarLoader /></div>) : (
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Folio</th>
                  <th className="py-3 px-6 text-left">Tipo vale</th>
                  <th className="py-3 px-6 text-left">Descripcion</th>
                  <th className="py-3 px-6 text-left">Observacion</th>
                  <th className="py-3 px-6 text-left">Entrego</th>
                  <th className="py-3 px-6 text-left">Recibio</th>
                  <th className="py-3 px-6 text-left">Fecha</th>
                  <th className="py-3 px-6 text-left">Insumo</th>
                  <th className="py-3 px-6 text-left">Cantidad</th>
                  <th className="py-3 px-6 text-left">Opciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {
                  filteredTickes.map((ticket) => (
                    <tr key={ticket.idVale} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                      <TableRow texto={ticket.folio} />
                      <TableRow texto={ticket.tipoVale} />
                      <TableRow texto={ticket.descripcion} />
                      <TableRow texto={ticket.observacion} />
                      <TableRow texto={ticket.entrego} />
                      <TableRow texto={ticket.recibio} />
                      <TableRow texto='20-02-2002' />
                      <TableRow texto={ticket.codigoInsumo} />
                      <TableRow texto={ticket.cantidad} />
                      {
                        ticket.options ? (<td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              className="w-4 mr-2 transform hover:text-blue-500 cursor-pointer hover:scale-110">
                              <PencilSquareIcon onClick={() => setModals(prev => ({ ...prev, edit: { isOpen: true, product } }))} />
                            </div>
                            <div
                              className="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110">
                              <TrashIcon onClick={() => setModals(prev => ({ ...prev, delete: { isOpen: true, id: product.idProducto } }))} />
                            </div>
                          </div>
                        </td>) : null
                      }

                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </div>
      <FloatButton.BackTop />
      <div>
        <p>a</p>
        <Table
          columns={tableColumns}
          pagination={false}
          expandable={{
            expandedRowRender,


          }}
          dataSource={allTickets}
        />
        <p>a</p>
      </div>
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