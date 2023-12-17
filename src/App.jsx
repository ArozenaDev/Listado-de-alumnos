import { useState } from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import dayjs from "dayjs";
import CreateStudent from "./components/createStudent";
import EditStudent from "./components/EditStudent";

function App() {
  const [studentsList, setStudentsList] = useState([
    {
      id: 1,
      Nombre: "Paco",
      Apellidos: "Pérez López",
      Edad: 44,
      Curso: 1,
      Alta: 'Nov 22, 2013',
      Media: 0.5,
      Completado: 88,
    },
    {
      id: 2,
      Nombre: "Aitor",
      Apellidos: "Tilla Francesa",
      Edad: 12,
      Curso: 2,
      Alta: 'May 7, 2020',
      Media: 9,
      Completado: 33,
    },
  ]);

  const [cursos] = useState(["Freshman", "Sophomore", "Junior", "Senior"]);

  const [studentFound, setStudentFound] = useState([]);

  const removeStudent = (id) => {
    let tempStudentsList = studentsList.filter((student) => student.id !== id);
    setStudentsList(tempStudentsList);
  };

  const edit = (id) => {
    let studentFound = studentsList.find((student) => student.id === id);
    setStudentFound(studentFound);
  };

  return (
    <>
      <div className="container-md">
        <nav className="navbar navbar-dark bg-primary mt-2 mb-2">
          <div className="container-fluid">
            <span className="navbar-text text-light">Listado de alumnos</span>
          </div>
        </nav>
        <div className="input-group mb-3"></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Edad</th>
              <th scope="col">Curso</th>
              <th scope="col">Alta</th>
              <th scope="col">Media</th>
              <th scope="col">Completado</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((e) => (
              <tr scope="row" key={e.id}>
                <td>{e.Nombre}</td>
                <td>{e.Apellidos}</td>
                <td>{e.Edad}</td>
                <td>{cursos[e.Curso]}</td>
                <td>{dayjs(e.Alta).format("DD/MM/YYYY")}</td>
                <td>{e.Media}</td>
                <td>
                  <Progress percent={e.Completado} />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => removeStudent(e.id)}
                  >
                    <i className="ri-delete-bin-5-fill"></i>
                  </button>
                  <span> </span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editarAlumno"
                    onClick={() => edit(e.id)}
                  >
                    <i className="ri-edit-2-fill"></i>
                  </button>
                  <div
                    className="modal fade"
                    id="editarAlumno"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="editarAlumnoLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="editarAlumnoLabel">
                            Editar Alumno
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <EditStudent studentsList={studentsList} setStudentsList={setStudentsList} studentFound={studentFound} />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#crearAlumno"
        >
          Crear alumno
        </button>
        <div
          className="modal fade"
          id="crearAlumno"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="crearAlumnoLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="crearAlumnoLabel">
                  Crear alumno
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <CreateStudent studentsList={studentsList} setStudentsList={setStudentsList}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark"></nav>
    </>
  );
}

export default App;
