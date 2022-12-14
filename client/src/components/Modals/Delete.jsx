import Modal from 'antd/es/modal'
import toast from "react-hot-toast";
import axios from 'axios';

const Delete = ({ modals, setModals, fetchProducts, texto }) => {

  const btnDelete = async () => {
    try {
      await axios.delete('http://localhost:3000/insumos/' + modals.delete.id)
      fetchProducts()
      setModals(prev => ({ ...prev, delete: { isOpen: false, id: '' } }))
      toast.success(texto, { position: 'top-right', duration: 2500 })
    } catch (error) {
      toast.error('Hubo un error interno, consulta con un administrador', { position: 'top-right', duration: 2500 })
    }
  }
  return (
    <Modal footer={[
      <div key={10} className="flex justify-around items-center my-2 p-4">
        <button
          onClick={() => setModals(prev => ({ ...prev, delete: { isOpen: false, id: '' } }))}
          className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-1 rounded-xl "
        >
          <span>Cancelar</span>
        </button>
        <button className=' bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-1 rounded-xl ' onClick={btnDelete}>
          <span>Confirmar</span>
        </button>
      </div>
    ]} className="md:min-w-fit" open={modals.delete.isOpen} onOk={btnDelete} onCancel={() => setModals(prev => ({ ...prev, delete: { isOpen: false, id: '' } }))}>
      <div className="text-center p-5 flex-auto justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h2 className="text-xl font-bold py-4 ">¿Estas seguro?</h2>
        <p className="text-lg text-gray-700 px-8 ">¿Realmente quieres eliminar este registro? No se podra recuperar</p>
      </div>
    </Modal>
  )
}

export default Delete