# Listado de alumnos

Para este proyecto usaremos diferentes tecnologías para sus diferentes secciones:

**General**

Para el proyecto usaremos HTML + CSS + JS + REACT.

Complementaremos la parte visual con [Bootstrap](https://getbootstrap.com/) y simplificaremos la lógica con [Lodash](https://lodash.com/). Los iconos de la aplicación
se importarán de [Remix Icons](https://remixicon.com/).

**Lista de alumnos**

Crearemos una lista con los datos de los alumnos. Para ello crearemos una tabla cuya cabecera sea Nombre |
Apellidos | Edad | Curso | Alta | Media | Completado y las diferentes filas contendrán los datos de los alumnos.
Se implementará un botón en cada fila para editar los datos del alumno, el cual abrirá una ventana modal con los datos del alumno para su modificación o eliminación. Para ello usaremos [Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/#how-it-works). Este listado se complementará con las funciones de [AutoAnimate](https://auto-animate.formkit.com/#usage-react).

**Botones**

Al final de la lista de alumnos añadiremos un botón llamado "Crear alumno". Este botón abrirá un modal usando [Bootstrap](https://getbootstrap.com/docs/5.3/components/modal/#how-it-works), con un formulario.

**Formulario**

Crearemos un formulario en el que introducir los datos del alumno con [Formik](https://formik.org/) y controlaremos lo introducido en los campos mediante [Yup](https://formik.org/docs/tutorial#schema-validation-with-yup). Crearemos dos botones al final del formulario, uno para validar y otro para cancelar. Al pulsar en validar los datos introducidos en el formulario serán añadidos a la lista de alumnos.

**Extras**

Una vez terminado lo anterior, investigaremos en [AutoAnimate](https://auto-animate.formkit.com/#usage-react) las diferentes opciones para ordenar los alumnos por diferentes criterios haciendo uso de un dropdown.

**Funcionalidad**

Recogeremos todos los datos de alumnos en un array de objetos, el cual guardaremos en localStorage. Crearemos un useState en el cual recuperaremos los datos de los alumnos y se imprimrán en pantalla. Para imprimirlos, crearemos una tabla con el header fijo y luego iremos imprimiendo las filas con los datos de los alumnos mapeando el array original e imprimiendo los objetos uno por uno.

Para añadir alumnos, haremos una copia del array almacenado en el localStorage y a dicha copia le añadiremos los alumnos nuevos con los datos recogidos en el formulario al pulsar el botón validar. La copia del array de objetos original junto con los nuevos introducidos se almacenara en un nuevo setState, se le pasará como parámetro al anterior setState y se almacernará en el localStorage con los nuevos datos.

Para editar o borrar alumnos, repetiremos el proceso anterior pero a la función le pasaremos como parámetro el alumno en el que se ha hecho clic en borrar. Haremos la copia del array y sobre la copia filtraremos el objeto que coincida con el del botón pulsado y lo eliminaremos del array o modificaremos sus datos. Pasamos el array temporal como parámetro al array original y lo almacenamos de nuevo en el localStorage.