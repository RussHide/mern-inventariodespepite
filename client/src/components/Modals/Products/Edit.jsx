import Modal from 'antd/es/modal'
import Select from 'antd/es/select'
import Input from 'antd/es/input/index'
import { useState } from 'react'
import toast from "react-hot-toast";
import axios from 'axios';


const Edit = ({ modals, setModals, fetchProducts }) => {
  const { codigo, nombre, categoria, unidad } = modals.edit.product

  const btnEditProduct = async () => {
    if (!Object.values(modals.edit.product).every(value => value !== '')) {
      toast.error('Debes llenar todos los campos', { duration: 2000, position: 'top-right' })
      return
    }
    try {
      await axios.patch('http://localhost:3000/insumos/' + modals.edit.product.idProducto, modals.edit.product)
      /* await fetch('http://localhost:3000/insumos', { method: 'post', body: JSON.stringify({nombre: 'aa'}) }) */
      fetchProducts()
      setModals(prev => ({...prev, edit: {isOpen: false, product: {}}}))
      toast.success('Se edito correctamente', { duration: 2000, position: 'top-right' })
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error en el servidor', { duration: 2000, position: 'top-right' })
    }
  }
  return (
    <Modal footer={[
      <div key={1} className="flex justify-around items-center p-3">
        <button
          onClick={() => setModals(prev => ({ ...prev, edit: { isOpen: false, product: {} } }))}
          className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-2 rounded-xl ">
          <span>Cancelar</span>
        </button>
        <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnEditProduct}>
          <span>Confirmar</span>
        </button>
      </div>
    ]} className="md:min-w-fit" open={modals.edit.isOpen} onOk={btnEditProduct} onCancel={() => setModals(prev => ({ ...prev, edit: { isOpen: false, product: {} } }))}>
      <div className="flex flex-col items-center " >
        <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Editar Insumo</h2>
        <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
      </div>
      <div>
        <div className="flex  justify-around items-center  w-full ">
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 w-full  p-2">
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Codigo</label>
              <Input label="Codigo" placeholder='Codigo' value={codigo} onChange={(e) => setModals(prev => ({ ...prev, edit: { ...prev.edit, product: { ...prev.edit.product, codigo: e.target.value } }}))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Nombre</label>
              <Input label="Codigo" placeholder='Nombre' value={nombre} onChange={(e) => setModals(prev => ({ ...prev, edit: { ...prev.edit, product: { ...prev.edit.product, nombre: e.target.value } } }))} />
            </div>
            <div className=" col-span-1 ">
              <label htmlFor="" className="text-xs font-semibold px-1">Categoria</label>
              <Select
                className='w-full'
                placeholder="Selecciona una categoria"
                optionFilterProp="children"
                value={categoria}
                onChange={(e) => setModals(prev => ({ ...prev, edit: { ...prev.edit, product: { ...prev.edit.product, categoria: e } } }))}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'INSECTICIDA', label: 'INSECTICIDA' },
                  { value: 'ADHERENTE', label: 'ADHERENTE' },
                  { value: 'DEFOLIANTE', label: 'DEFOLIANTE' },
                  { value: 'REGULADOR', label: 'REGULADOR' },
                  { value: 'HERBICIDA', label: 'HERBICIDA' },
                  { value: 'SEMILLA', label: 'SEMILLA' },
                  { value: 'SEMILLA TRANSGENICA', label: 'SEMILLA TRANSGENICA' },
                ]}
              />
            </div>
            <div className="col-span-1 " >
              <label htmlFor="" className="text-xs font-semibold px-1">Unidad</label>
              <Select
                className='w-full'
                placeholder="Selecciona una unidad"
                optionFilterProp="children"
                value={unidad}
                onChange={(e) => setModals(prev => ({ ...prev, edit: { ...prev.edit, product: { ...prev.edit.product, unidad: e } } }))}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'KG', label: 'KG' },
                  { value: 'L', label: 'L' },
                  { value: 'Bulto', label: 'Bulto' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal >
  )
}

export default Edit