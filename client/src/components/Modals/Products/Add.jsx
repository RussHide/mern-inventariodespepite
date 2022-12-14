import Modal from 'antd/es/modal'
import Select from 'antd/es/select'
import Input from 'antd/es/input/index'
import { useState } from 'react'
import toast from "react-hot-toast";
import axios from 'axios';



const Add = ({ modals, setModals, fetchProducts }) => {
    const [newProductData, setNewProductData] = useState({
        codigo: '',
        nombre: '',
        categoria: '',
        unidad: '',
        cantidad: '0',
    })
    const btnAddProduct = async () => {
        if (!Object.values(newProductData).every(value => value !== '')) {
            toast.error('Debes llenar todos los campos', { duration: 2000, position: 'top-right' })
            return
        }
        try {
            await axios.post('http://localhost:3000/insumos', newProductData)
            /* await fetch('http://localhost:3000/insumos', { method: 'post', body: JSON.stringify({nombre: 'aa'}) }) */
            fetchProducts()
            setModals(prev => ({...prev, add: {isOpen: false}}))
            toast.success('Se guardo correctamente', { duration: 2000, position: 'top-right' })
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error en el servidor', { duration: 2000, position: 'top-right' })
        }
    }
    return (
        <Modal footer={[
            <div key={1} className="flex justify-around items-center p-3">
                <button
                    onClick={() => setModals(prev => ({ ...prev, add: { isOpen: false } }))}
                    className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-2 rounded-xl ">
                    <span>Cancelar</span>
                </button>
                <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnAddProduct}>
                    <span>Confirmar</span>
                </button>
            </div>
        ]} className="md:min-w-fit" open={modals.add.isOpen} onOk={btnAddProduct} onCancel={() => setModals(prev => ({ ...prev, add: { isOpen: false } }))}>
            <div className="flex flex-col items-center " >
                <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Agregar Insumo</h2>
                <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
            </div>
            <div>
                <div className="flex  justify-around items-center  w-full ">
                    <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 w-full  p-2">
                        <div className=" col-span-1 ">
                            <label htmlFor="" className="text-xs font-semibold px-1">Codigo</label>
                            <Input label="Codigo" placeholder='Codigo' onChange={(e) => setNewProductData(prev => ({ ...prev, codigo: e.target.value }))} />
                        </div>
                        <div className=" col-span-1 ">
                            <label htmlFor="" className="text-xs font-semibold px-1">Nombre</label>
                            <Input label="Codigo" placeholder='Nombre' onChange={(e) => setNewProductData(prev => ({ ...prev, nombre: e.target.value }))} />
                        </div>
                        <div className=" col-span-1 ">
                            <label htmlFor="" className="text-xs font-semibold px-1">Categoria</label>
                            <Select
                                className='w-full'
                                placeholder="Selecciona una unidad"
                                optionFilterProp="children"
                                value={newProductData.categoria ? newProductData.categoria : null}
                                onChange={(e) => setNewProductData(prev => ({ ...prev, categoria: e }))}
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
                        <div className=" col-span-1 ">
                            <label htmlFor="" className="text-xs font-semibold px-1">Cantidad</label>
                            <Input label="Codigo" disabled value='0' />
                        </div>
                        <div className="col-span-1 " >
                            <label htmlFor="" className="text-xs font-semibold px-1">Unidad</label>
                            <Select
                                className='w-full'
                                placeholder="Selecciona una unidad"
                                optionFilterProp="children"
                                value={newProductData.unidad ? newProductData.unidad : null}
                                onChange={(e) => setNewProductData(prev => ({ ...prev, unidad: e }))}
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

export default Add