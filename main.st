miEmpresa := Empresa new.
miEmpresa init.
miEmpresa crearDatosDePrueba.

op := 0.

[ op = ($4 ) ] whileFalse: [
op := (miEmpresa menu).
(op == $1) ifTrue: [
	"miEmpresa solicitarReserva." 
	| ruta pasajeros id |
	ruta := Prompter prompt: 'Ingrese id de la ruta'.
	pasajeros := (Prompter prompt: 'Ingrese la cantidad de pasajeros') asNumber. 
	vehiculo := miEmpresa buscarVehiculo: pasajeros.
	(vehiculo > 0) ifTrue: [
		user :=Prompter prompt: 'Ingrese su DNI'.
		res := miEmpresa buscarUsuario: user.
		(res = 0) ifTrue: [
			miEmpresa altaUsuario.
		].
		"Registrar reserva"
	]
	ifFalse:[
		MessageBox notify: 'No hay autos disponibles con esas caracteristicas'.
	].
	
	
].

]

