miEmpresa := Empresa new.
miEmpresa init.

persona := Usuario new.
persona dni: 5.
miEmpresa agregar: persona.


persona := Usuario new.
persona dni: 2.
miEmpresa agregar: persona.

persona := Usuario new.
persona dni: 69.
miEmpresa agregar: persona.
"
miEmpresa crearDatosDePrueba.
miEmpresa altaReserva.
miEmpresa" 
"
miEmpresa altaUsuario.
miEmpresa altaUsuario.
miEmpresa altaUsuario.
"

"Ejecutar esto debería producir los mismos resultados. La teoría dada en clase parece indicar que esta es la forma de hacer las altas -TM"
miEmpresa buscarUsuario: 3.
"Funciona -MG"