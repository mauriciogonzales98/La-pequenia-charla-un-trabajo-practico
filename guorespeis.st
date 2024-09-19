miEmpresa := Empresa new.
miEmpresa nombre: 'La pequenia charla'.
miEmpresa nombre.
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

miEmpresa buscarUsuario: 2.