import Modal from 'antd/es/modal'
import Select from 'antd/es/select'
import Input from 'antd/es/input/index'
import { useState } from 'react'
import toast from "react-hot-toast";
import axios from 'axios';
import { useEffect } from 'react';



const Add = ({ modals, setModals, fetchTickets }) => {
  const [nameProductsStack, setNameProductsStack] = useState([])
  const [productsStack, setProductsStack] = useState([{
    insumo: '',
    cantidad: ''
  }])
  const [newTicketData, setNewTicketData] = useState({
    folio: '',
    tipoVale: '',
    descripcion: '',
    observacion: '',
    entrego: '',
    recibio: '',
    fecha: '',
  })

  useEffect(() => {
    const fetchProductsName = async () => {
      const { data } = await axios.get('http://localhost:3000/insumos/nombres')
      const formatData = await data.map(item => ({ value: item.nombre, label: item.nombre }))
      setNameProductsStack(formatData)
    }
    fetchProductsName()
  }, [])

  const btnAddTicket = async () => {
    if (!Object.values(newTicketData).every(value => value !== '')) {
      toast.error('Debes llenar todos los campos', { duration: 2000, position: 'top-right' })
      return
    }
    try {
      await axios.post('http://localhost:3000/vales', [newTicketData, productsStack])
      /* await fetch('http://localhost:3000/insumos', { method: 'post', body: JSON.stringify({nombre: 'aa'}) }) */
      fetchTickets()
      setModals(prev => ({ ...prev, add: { isOpen: false } }))
      toast.success('El vale guardo correctamente', { duration: 2000, position: 'top-right' })
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error en el servidor', { duration: 2000, position: 'top-right' })
    }
  }

  const changeAddDelete = (e, index, op) => {
    let newArr = [...productsStack]
    if (op === 'in') {
      newArr[index].insumo = e
    } else {
      newArr[index].cantidad = e
    }
    setProductsStack(newArr)
  }

  const btnAddProductInput = () => {
    setProductsStack(prev => ([...prev, { insumo: '', cantidad: '' }]))
  }
  const btnDeleteProductInput = () => {
    if (productsStack.length !== 1) {
      const newArr = [...productsStack]
      newArr.pop()
      setProductsStack(newArr)
    } else {
      toast.error('Debes dejar al menos un registro de insumo', { duration: 2000, position: 'top-right' })
    }
  }

  return (
    <Modal footer={[
      <div key={1} className="flex justify-around items-center p-3">
        <div className='w-1/2 flex justify-around items-center'>
          <button
            onClick={() => setModals(prev => ({ ...prev, add: { isOpen: false } }))}
            className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-2 rounded-xl ">
            <span>Cancelar</span>
          </button>
          <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnAddTicket}>
            <span>Confirmar</span>
          </button>
        </div>
        <div className='w-1/2 flex justify-around items-center'>
          <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnAddProductInput}>
            <span>Agregar</span>
          </button>
          <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnDeleteProductInput}>
            <span>Eliminar</span>
          </button>
        </div>
      </div>
    ]} className="md:min-w-fit" open={modals.add.isOpen} onOk={btnAddTicket} onCancel={() => setModals(prev => ({ ...prev, add: { isOpen: false } }))}>
      <div className="flex flex-col items-center " >
        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Agregar Vale</h2>
        <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
      </div>
      <div>
        <div className="flex  justify-around   w-full ">
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-3 w-3/5  p-2">
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Folio</label>
              <Input label="Codigo" placeholder='Folio' onChange={(e) => setNewTicketData(prev => ({ ...prev, folio: e.target.value }))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Tipo vale</label>
              <Select
                className='w-full'
                placeholder="Selecciona una unidad"
                optionFilterProp="children"
                value={newTicketData.tipoVale ? newTicketData.tipoVale : null}
                onChange={(e) => setNewTicketData(prev => ({ ...prev, tipoVale: e }))}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'Entrada', label: 'Entrada' },
                  { value: 'Salida', label: 'Salida' },
                ]}
              />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Descripcion</label>
              <Input label="Codigo" placeholder='Descripcion' onChange={(e) => setNewTicketData(prev => ({ ...prev, descripcion: e.target.value }))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Observacion</label>
              <Input label="Codigo" placeholder='Observacion' onChange={(e) => setNewTicketData(prev => ({ ...prev, observacion: e.target.value }))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Entrego</label>
              <Input label="Codigo" placeholder='Entrego' onChange={(e) => setNewTicketData(prev => ({ ...prev, entrego: e.target.value }))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Recibio</label>
              <Input label="Codigo" placeholder='Recibio' onChange={(e) => setNewTicketData(prev => ({ ...prev, recibio: e.target.value }))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Fecha</label>
              <Input label="Codigo" placeholder='Fecha' onChange={(e) => setNewTicketData(prev => ({ ...prev, fecha: e.target.value }))} />
            </div>

          </div>
          <div className="grid grid-cols-2 w-2/5 h-fit p-2">
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Insumo</label>
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Canditad</label>
            </div>
            <div className='col-span-3 overflow-x-auto max-h-48'>
              {
                productsStack.map((prod, index) => (
                  <div key={index} className='grid grid-cols-2 w-full gap-2 mb-2'>
                    <div >
                      <Select
                        className='w-full'
                        placeholder="Selecciona el insumo"
                        optionFilterProp="children"
                        showSearch
                        onChange={(e) => changeAddDelete(e, index, 'in')}
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={nameProductsStack}
                      />
                    </div>
                    <div >
                      <Input label="Codigo" placeholder='Cantidad' onChange={(e) => changeAddDelete(e.target.value, index, 'ca')} />
                    </div>
                  </div>
                ))
              }

            </div>

          </div>
        </div>
      </div>
    </Modal >
  )
}

export default Add