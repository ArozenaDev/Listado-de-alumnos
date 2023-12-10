import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import dayjs from "dayjs";

function App() {
  const [studentsList, setStudentsList] = useState([
    {
      id: 1,
      Nombre: "Paco",
      Apellidos: "Pérez López",
      Edad: 44,
      Curso: 1,
      Alta: 22 / 11 / 2013,
      Media: 0.5,
      Completado: 88,
    },
    {
      id: 2,
      Nombre: "Aitor",
      Apellidos: "Tilla Francesa",
      Edad: 12,
      Curso: 2,
      Alta: 20 / 5 / 2020,
      Media: 9,
      Completado: 33,
    },
  ]);

  const [cursos] = useState(["Freshman", "Sophomore", "Junior", "Senior"]);

  const addStudent = (values, { resetForm }) => {
    let tempStudentsList = [...studentsList];
    let tempValues = {
      id: Math.random(),
      Nombre: values.Nombre,
      Apellidos: values.Apellidos,
      Edad: values.Edad,
      Curso: values.Curso,
      Alta: values.Alta,
      Media: values.Media,
      Completado: values.Completado,
    };
    tempStudentsList.push(tempValues);
    setStudentsList(tempStudentsList);
    resetForm();
  };

  const removeStudent = (id) => {
    let tempStudentsList = studentsList.filter((student) => student.id !== id);
    setStudentsList(tempStudentsList);
  };

  const [studentFound, setStudentFound] = useState([]);

  const edit = (id) => {
    let studentsFound = studentsList.find((student) => student.id === id);
    let tempFound = [];
    let tempStudent = {
      id: studentsFound.id,
      Nombre: studentsFound.Nombre,
      Apellidos: studentsFound.Apellidos,
      Edad: studentsFound.Edad,
      Curso: studentsFound.Curso,
      Alta: studentsFound.Alta,
      Media: studentsFound.Media,
      Completado: studentsFound.Completado,
    };
    tempFound.push(tempStudent);
    setStudentFound(tempFound);
  };

  const change = (values) => {
    let tempStudentsList = [...studentsList];
    let tempValues = [
      {
        id: values.id,
        Nombre: values.Nombre,
        Apellidos: values.Apellidos,
        Edad: values.Edad,
        Curso: values.Curso,
        Alta: values.Alta,
        Media: values.Media,
        Completado: values.Completado,
      },
    ];
    let merge = Object.assign(tempStudentsList, tempValues);
    console.log(merge);
    setStudentsList(merge);
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
                          {studentFound.map((f) => (
                            <>
                              <Formik
                                initialValues={{
                                  id: f.id,
                                  Nombre: f.Nombre,
                                  Apellidos: f.Apellidos,
                                  Edad: f.Edad,
                                  Curso: cursos[f.Curso],
                                  Alta: f.Alta,
                                  Media: f.Media,
                                  Completado: f.Completado,
                                }}
                                validationSchema={Yup.object({
                                  Nombre:
                                    Yup.string().required("Campo obligatorio"),
                                  Apellidos:
                                    Yup.string().required("Campo obligatorio"),
                                  Edad: Yup.number()
                                    .required("Campo obligatorio")
                                    .min(18, "No menores de edad"),
                                  Curso:
                                    Yup.string().required("Campo obligatorio"),
                                  Alta: Yup.date()
                                    .required("Campo obligatorio")
                                    .max(
                                      new Date(),
                                      "La fecha no puede ser posterior a hoy"
                                    ),
                                  Media: Yup.number()
                                    .required("Campo obligatorio")
                                    .test(
                                      "dosDecimales",
                                      "Máximo 2 decimales",
                                      (value) => {
                                        const [, decimals] = value
                                          .toString()
                                          .split(".");
                                        return (
                                          !decimals || decimals.length <= 2
                                        );
                                      }
                                    ),
                                  Completado: Yup.number()
                                    .required("Campo obligatorio")
                                    .typeError("Introduce un número sin %")
                                    .max(100, "máximo 100, sin %"),
                                })}
                                validateOnBlur={false}
                                validateOnChange={false}
                                onSubmit={change}
                                enableReinitialize
                              >
                                {({ errors }) => (
                                  <Form>
                                    {errors && (
                                      <>
                                        <div>
                                          {errors.Nombre && (
                                            <span>Nombre: {errors.Nombre}</span>
                                          )}
                                        </div>
                                        <div>
                                          {errors.Apellidos && (
                                            <span>
                                              Apellidos: {errors.Apellidos}
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          {errors.Edad && (
                                            <span>Edad: {errors.Edad}</span>
                                          )}
                                        </div>
                                        <div>
                                          {errors.Curso && (
                                            <span>Curso: {errors.Curso}</span>
                                          )}
                                        </div>
                                        <div>
                                          {errors.Alta && (
                                            <span>Alta: {errors.Alta}</span>
                                          )}
                                        </div>
                                        <div>
                                          {errors.Media && (
                                            <span>Media: {errors.Media}</span>
                                          )}
                                        </div>
                                        <div>
                                          {errors.Completado && (
                                            <span>
                                              Completado: {errors.Completado}
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    )}
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Nombre
                                      </span>
                                      <Field
                                        type="text"
                                        name="Nombre"
                                        placeholder="Nombre"
                                        className="form-control"
                                        style={
                                          errors.Nombre && {
                                            borderColor: "red",
                                          }
                                        }
                                      />
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Apellidos
                                      </span>
                                      <Field
                                        type="text"
                                        name="Apellidos"
                                        placeholder="Apellidos"
                                        className="form-control"
                                        style={
                                          errors.Apellidos && {
                                            borderColor: "red",
                                          }
                                        }
                                      />
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Edad
                                      </span>
                                      <Field
                                        type="number"
                                        name="Edad"
                                        placeholder="Edad"
                                        className="form-control"
                                        style={
                                          errors.Apellidos && {
                                            borderColor: "red",
                                          }
                                        }
                                      />
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Curso
                                      </span>
                                      <Field
                                        type
                                        as="select"
                                        name="Curso"
                                        placeholder="Curso"
                                        className="form-select"
                                        style={
                                          errors.Apellidos && {
                                            borderColor: "red",
                                          }
                                        }
                                      >
                                        <option value="0">Freshman</option>
                                        <option value="1">Sophomore</option>
                                        <option value="2">Junior</option>
                                        <option value="3">Senior</option>
                                      </Field>
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Alta
                                      </span>
                                      <Field
                                        type="date"
                                        name="Alta"
                                        placeholder="Alta"
                                        className="form-control"
                                        style={
                                          errors.Apellidos && {
                                            borderColor: "red",
                                          }
                                        }
                                      />
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Media
                                      </span>
                                      <Field
                                        type="float"
                                        name="Media"
                                        placeholder="Media"
                                        className="form-control"
                                        style={
                                          errors.Apellidos && {
                                            borderColor: "red",
                                          }
                                        }
                                      />
                                    </div>
                                    <div className="input-group mb-3">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        Completado
                                      </span>
                                      <Field
                                        type="text"
                                        name="Completado"
                                        placeholder="Completado"
                                        className="form-control"
                                        style={
                                          errors.Apellidos && {
                                            borderColor: "red",
                                          }
                                        }
                                      />
                                      <span className="input-group-text" id="basic-addon2">%</span>
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Editar
                                    </button>
                                  </Form>
                                )}
                              </Formik>
                            </>
                          ))}
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
                <Formik
                  initialValues={{
                    Nombre: "",
                    Apellidos: "",
                    Edad: "",
                    Curso: "0",
                    Alta: "",
                    Media: "",
                    Completado: "",
                  }}
                  validationSchema={Yup.object({
                    Nombre: Yup.string().required("Campo obligatorio"),
                    Apellidos: Yup.string().required("Campo obligatorio"),
                    Edad: Yup.number()
                      .required("Campo obligatorio")
                      .min(18, "No menores de edad"),
                    Curso: Yup.string().required("Campo obligatorio"),
                    Alta: Yup.date()
                      .required("Campo obligatorio")
                      .max(new Date(), "La fecha no puede ser posterior a hoy"),
                    Media: Yup.number()
                      .required("Campo obligatorio")
                      .test("dosDecimales", "Máximo 2 decimales", (value) => {
                        const [, decimals] = value.toString().split(".");
                        return !decimals || decimals.length <= 2;
                      }),
                    Completado: Yup.number()
                      .required("Campo obligatorio")
                      .typeError("Introduce un número sin %")
                      .max(100, "máximo 100, sin %"),
                  })}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={addStudent}
                >
                  {({ errors }) => (
                    <Form>
                      {errors && (
                        <>
                          <div>
                            {errors.Nombre && (
                              <span>Nombre: {errors.Nombre}</span>
                            )}
                          </div>
                          <div>
                            {errors.Apellidos && (
                              <span>Apellidos: {errors.Apellidos}</span>
                            )}
                          </div>
                          <div>
                            {errors.Edad && <span>Edad: {errors.Edad}</span>}
                          </div>
                          <div>
                            {errors.Curso && <span>Curso: {errors.Curso}</span>}
                          </div>
                          <div>
                            {errors.Alta && <span>Alta: {errors.Alta}</span>}
                          </div>
                          <div>
                            {errors.Media && <span>Media: {errors.Media}</span>}
                          </div>
                          <div>
                            {errors.Completado && (
                              <span>Completado: {errors.Completado}</span>
                            )}
                          </div>
                        </>
                      )}
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Nombre
                        </span>
                        <Field
                          type="text"
                          name="Nombre"
                          placeholder="Nombre"
                          className="form-control"
                          style={errors.Nombre && { borderColor: "red" }}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Apellidos
                        </span>
                        <Field
                          type="text"
                          name="Apellidos"
                          placeholder="Apellidos"
                          className="form-control"
                          style={
                            errors.Apellidos && {
                              borderColor: "red",
                            }
                          }
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Edad
                        </span>
                        <Field
                          type="number"
                          name="Edad"
                          placeholder="Edad"
                          className="form-control"
                          style={
                            errors.Edad && {
                              borderColor: "red",
                            }
                          }
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Curso
                        </span>
                        <Field
                          type
                          as="select"
                          name="Curso"
                          placeholder="Curso"
                          className="form-select"
                          style={
                            errors.Curso && {
                              borderColor: "red",
                            }
                          }
                        >
                          <option value="0">Freshman</option>
                          <option value="1">Sophomore</option>
                          <option value="2">Junior</option>
                          <option value="3">Senior</option>
                        </Field>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Alta
                        </span>
                        <Field
                          type="date"
                          name="Alta"
                          placeholder="Alta"
                          className="form-control"
                          style={
                            errors.Alta && {
                              borderColor: "red",
                            }
                          }
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Media
                        </span>
                        <Field
                          type="float"
                          name="Media"
                          placeholder="Media"
                          className="form-control"
                          style={
                            errors.Media && {
                              borderColor: "red",
                            }
                          }
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          Completado
                        </span>
                        <Field
                          type="text"
                          name="Completado"
                          placeholder="Completado"
                          className="form-control"
                          style={
                            errors.Completado && {
                              borderColor: "red",
                            }
                          }
                        />
                          <span className="input-group-text" id="basic-addon2">%</span>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Inscribir
                      </button>
                    </Form>
                  )}
                </Formik>
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
