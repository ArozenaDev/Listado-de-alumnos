import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

function App() {

  const [studentsList, setStudentsList] = useState([
    {
    Nombre: "Paco",
    Apellidos: "Pérez López",
    Edad: 44,
    Curso: 1,
    Alta: 22/11/2013,
    Media: 0.5,
    Completado: "30%",
  },
  {
    Nombre: "Aitor",
    Apellidos: "Tilla Francesa",
    Edad: 12,
    Curso: 2,
    Alta: 20/5/2020,
    Media: 9,
    Completado: "80%",
  },
]);

const [cursos] = useState(['Freshman', 'Sophomore', 'Junior', 'Senior']);

console.log(studentsList);

const addStudent = (values, {resetForm}) => {
  let tempStudentsList = [...studentsList];
  tempStudentsList.push(values);
  setStudentsList(tempStudentsList);
  resetForm();
}


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
              <td>{cursos[e.Curso]}</td>
              <td>{e.Alta}</td>
              <td>{e.Media}</td>
              <td>{e.Completado}</td><i className='ri-delete-bin-line'></i>
            </tr>
            )} 
          </tbody>
        </table>
        <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#crearAlumno">Crear alumno</button>

        <div className='modal fade' id="crearAlumno" tabIndex={-1} role='dialog' aria-labelledby='crearAlumnoLabel' aria-hidden="true">
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id="crearAlumnoLabel">Crear alumno</h5>
                <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div className='modal-body'>
                <Formik
                  initialValues={{
                    Nombre: '',
                    Apellidos: '',
                    Edad: '',
                    Curso: '',
                    Alta: '',
                    Media: '',
                    Completado: '',
                  }}
                  validationSchema={Yup.object({
                    Nombre: Yup.string().required('Campo obligatorio'),
                    Apellidos: Yup.string().required('Campo obligatorio'),
                    Edad: Yup.number().required('Campo obligatorio').min(18, 'No menores de edad'),
                    Curso: Yup.number().required('Campo obligatorio'),
                    Alta: Yup.date().required('Campo obligatorio'),
                    Media: Yup.number().required('Campo obligatorio'),
                    Completado: Yup.number().required('Campo obligatorio'),
                  })}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={addStudent}
                  >
                    {({errors}) => (
                      <Form>
                        <Field type="text" name="Nombre" placeholder="Nombre" style={errors.Nombre && {borderColor: 'red'}}/>
                        <Field type="text" name="Apellidos" placeholder="Apellidos" style={errors.Apellidos && {borderColor: 'red'}} />
                        <Field type="number" name="Edad" placeholder="Edad" style={errors.Edad && {borderColor: 'red'}} />
                        <Field type as="select" name="Curso" placeholder="Curso" style={errors.Curso && {borderColor: 'red'}}>
                          <option value="0">Freshman</option>
                          <option value="1">Sophomore</option>
                          <option value="2">Junior</option>
                          <option value="3">Senior</option>
                        </Field>
                        <Field type="date" name="Alta" placeholder="Alta" style={errors.Alta && {borderColor: 'red'}} />
                        <Field type="float" name="Media" placeholder="Media" style={errors.Media && {borderColor: 'red'}} />
                        <Field type="text" name="Completado" placeholder="Completado" style={errors.Completado && {borderColor: 'red'}} />
                        {errors && (
                          <>
                          <div>{errors.Nombre && <span>Nombre: {errors.Nombre}</span>}</div>
                          <div>{errors.Apellidos && <span>Apellidos: {errors.Apellidos}</span>}</div>
                          <div>{errors.Edad && <span>Edad: {errors.Edad}</span>}</div>
                          <div>{errors.Curso && <span>Curso: {errors.Curso}</span>}</div>
                          <div>{errors.Alta && <span>Alta: {errors.Alta}</span>}</div>
                          <div>{errors.Media && <span>Media: {errors.Media}</span>}</div>
                          <div>{errors.Completado && <span>Completado: {errors.Completado}</span>}</div>
                          </>
                        )}
                        <button type="submit">Inscribir</button>
                      </Form>
                    )}
                    </Formik>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark"></nav>
    </>
)}

export default App
