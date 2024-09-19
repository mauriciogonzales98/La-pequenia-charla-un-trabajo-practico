miEmpresa := Empresa new.
miEmpresa init.

persona := Usuario new.
persona dni: 5.
miEmpresa agregarUsuario: persona.

persona := Usuario new.
persona dni: 2.
miEmpresa agregarUsuario: persona.

persona := Usuario new.
persona dni: 69.
miEmpresa agregarUsuario: persona.

miEmpresa buscarUsuario: 3.