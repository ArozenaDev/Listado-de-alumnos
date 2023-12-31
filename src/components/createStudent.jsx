import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";


export default function CreateStudent(props) {
    const {getStudents} = props;

    const addStudent = (values, { resetForm }) => {
        axios.post('http://localhost:3000/students', values).then(() => {
          getStudents();
        }).catch((error) => console.log('ERROR', error.message));
        resetForm();
      };
      

    return (
        <>
    <Formik
                  initialValues={{
                    Nombre: "",
                    Apellidos: "",
                    Edad: "",
                    Curso: 0,
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
                    Curso: Yup.number().required("Campo obligatorio"),
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
                </>
    );
}
