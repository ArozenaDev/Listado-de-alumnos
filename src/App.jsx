import { useState } from 'react'

function App() {

  const [studentsList, setStudentsList] = useState([
    {
    Nombre: "Paco",
    Apellidos: "Pérez López",
    Edad: 44,
    Curso: "3º",
    Alta: 22/11/2013,
    Media: 0.5,
    Completado: "30%",
  },
  {
    Nombre: "Aitor",
    Apellidos: "Tilla Francesa",
    Edad: 12,
    Curso: "1º",
    Alta: 20/5/2020,
    Media: 9,
    Completado: "80%",
  },
]);

  return (
    <>
    <div className="container-md">
        <nav className="navbar navbar-dark bg-primary mt-2 mb-2">
          <div className="container-fluid">
            <span className="navbar-text text-light">Listado de alumnos</span>
          </div>
        </nav>
        <div className="input-group mb-3"></div>
        <table className='table table-bordered'>
          <thead>
            <tr>
            <th scope="col">Nombre</th>
            <th scope='col'>Apellidos</th>
            <th scope='col'>Edad</th>
            <th scope='col'>Curso</th>
            <th scope='col'>Alta</th>
            <th scope='col'>Media</th>
            <th scope='col'>Completado</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((e) =>
            <tr scope='row' key={e.Nombre}>
              <td>{e.Nombre}</td>
              <td>{e.Apellidos}</td>
              <td>{e.Edad}</td>
              <td>{e.Curso}</td>
              <td>{e.Alta}</td>
              <td>{e.Media}</td>
              <td>{e.Completado}</td>
            </tr>
            )}
          </tbody>
        </table>
        <button type='button' className='btn btn-primary' data-toggle="modal" data-target="#crearAlumno">Crear alumno</button>

        <div className='modal fade' id="crearAlumno" tabIndex={-1} role='dialog' aria-labelledby='crearAlumnoLabel' aria-hidden="true">
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id="crearAlumnoLabel">Crear alumno</h5>
                <button type="button" className='close' data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                Hello
              </div>
              <div className='modal-foter'>
                <button type='button' className='btn btn-secondary' data-dismiss="modal">Cerrar</button>
                <button type='button' className='btn btn-primary'>Guardar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark"></nav>
    </>
)}

export default App
