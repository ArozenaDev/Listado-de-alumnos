# Listado de alumnos

Para este proyecto hemos usado diferentes tecnologías para sus diferentes secciones:

**General**

Para el proyecto se usará HTML + CSS + JS + REACT.

Complementaremos la parte visual con [Bootstrap](https://getbootstrap.com/) y Los iconos de la aplicación
se importarán de [Remix Icons](https://remixicon.com/).

**Lista de alumnos**

Una lista con los datos de los alumnos. Contiene una tabla cuya cabecera incluye Nombre |
Apellidos | Edad | Curso | Alta | Media | Completado y las diferentes filas contienen los datos de los alumnos.
Se implementa un botón en cada fila para editar los datos del alumno, el cual abre una ventana modal con los datos del alumno para su modificación o eliminación. Para ello usamos [Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/#how-it-works). Este listado se complementa con las funciones de [AutoAnimate](https://auto-animate.formkit.com/#usage-react).

**Botones**

Al final de la lista de alumnos se añade un botón llamado "Crear alumno". Este botón abrirá un modal usando [Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/#how-it-works), con un formulario.

**Formulario**

Para los formularios con los datos del alumno usamos [Formik](https://formik.org/) y controlamos lo introducido en los campos mediante [Yup](https://formik.org/docs/tutorial#schema-validation-with-yup). Hay botones al final del formulario, uno para validar y otro para cancelar. Al pulsar en validar los datos introducidos en el formulario serán añadidos a la lista de alumnos.
