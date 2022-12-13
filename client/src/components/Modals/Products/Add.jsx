import Modal from 'antd/es/modal'

const Add = () => {
  return (
    <Modal footer={[
      <div key={1} className="flex justify-around items-center p-3">
          <button
              onClick={() => setOpenAdd(!openAdd)}
              className="mr-1 bg-red-400 hover:bg-red-600 text-white px-8 md:px-14 py-2 rounded-xl ">
              <span>Cancelar</span>
          </button>
          <button className=" bg-green-400 hover:bg-green-600 text-white px-8 md:px-14 py-2 rounded-xl " onClick={btnAgregarAlumno}>
              <span>Confirmar</span>
          </button>
      </div>
  ]} className="md:min-w-fit" open={openAdd} onOk={btnAgregarAlumno} onCancel={() => setOpenAdd(!openAdd)}>
      <div className="flex flex-col items-center " >
          <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 ">Agregar Alumno</h2>
          <div className="h-1 w-40 bg-blue-400 rounded  mb-4"></div>
      </div>
      <div>
          <div className="flex  justify-around items-center  w-full ">
              <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 w-full  p-2">
                  <div className="flex col-span-1 ">
                      <Input label="Nombre" variant="outlined" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, nombrePila: e.target.value }))} />
                  </div>
                  <div className="flex col-span-1">
                      <Input label="Apellido paterno" variant="outlined" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, apePaterno: e.target.value }))} />
                  </div>
                  <div className="flex col-span-1">
                      <Input label="Apellido materno" variant="outlined" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, apeMaterno: e.target.value }))} />
                  </div>
                  <div className="col-span-1 " >
                      <Select label="Carrera" id="carrera" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, cvCarrera: e.split("-")[1] }))} >
                          <Option value="LSCA-956">LSCA - 956</Option>
                          <Option value="LSCA-689">LSCA - 689</Option>
                          <Option value="IIS-686">IIS - 686</Option>
                          <Option value="ITIC-754">ITIC - 754</Option>
                      </Select>
                  </div>
                  <div className="col-span-1" >
                      <Select menuProps={{ className: 'max-h-32' }} label="Semestre" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, semestre: e }))}>
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                          <Option value="4">4</Option>
                          <Option value="5">5</Option>
                          <Option value="6">6</Option>
                          <Option value="7">7</Option>
                          <Option value="8">8</Option>
                          <Option value="9">9</Option>
                      </Select>
                  </div>
                  <div className="col-span-1">
                      <Select label="Turno" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, turno: e }))}>
                          <Option value="M">Matutino</Option>
                          <Option value="V">Vespertino</Option>
                      </Select>
                  </div>
                  <div className="col-span-1 ">
                      <Select label="Seccion" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, seccion: e }))}>
                          <Option value="A">A</Option>
                          <Option value="B">B</Option>
                          <Option value="C">C</Option>
                      </Select>
                  </div>
                  <div className="flex col-span-1">
                      <Input label="Matricula" variant="outlined" onChange={(e) => setDatosNuevoAlumno(prev => ({ ...prev, matricula: e.target.value }))} />
                  </div>
              </div>
          </div>
      </div>
  </Modal>
  )
}

export default Add