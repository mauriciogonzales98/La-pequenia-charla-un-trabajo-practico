﻿| package |
package := Package name: 'TP-Gonzales-Montania-Tobarez-Zulliani-Neri'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Empresa;
	add: #Estandar;
	add: #Lujo;
	add: #Reserva;
	add: #Ruta;
	add: #Usuario;
	add: #Vehiculo;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'..\Object Arts\Dolphin\Base\Dolphin'
	'..\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Choice Prompter'
	'..\Object Arts\Dolphin\Base\Dolphin Legacy Date & Time'
	'..\Object Arts\Dolphin\Base\Dolphin Message Box'
	'..\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter').

package!

"Class Definitions"!

Object subclass: #Empresa
	instanceVariableNames: 'usuarios vehiculos rutas reservas'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Reserva
	instanceVariableNames: 'ruta fecha vehiculo cantPasajeros usuario'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Ruta
	instanceVariableNames: 'id puntoInicio puntoFinal distancia'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Usuario
	instanceVariableNames: 'nombre apellido dni'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Vehiculo
	instanceVariableNames: 'id marca modelo chofer estado maxPasajeros precioKm'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Vehiculo subclass: #Estandar
	instanceVariableNames: ''
	classVariableNames: 'Descuento'
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Vehiculo subclass: #Lujo
	instanceVariableNames: ''
	classVariableNames: 'Seguro'
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"Global Aliases"!


"Loose Methods"!

"End of package definition"!

"Source Globals"!

"Classes"!

Empresa guid: (GUID fromString: '{578b5b44-3b71-41f5-b076-a7e82fa15aed}')!
Empresa comment: ''!
!Empresa categoriesForClass!Kernel-Objects! !
!Empresa methodsFor!

agregar: usuario
usuarios add: usuario.!

altaReserva
|res pasajeros vehiculo usuario dni fecha idruta ruta|

idruta:= Prompter prompt: 'ingrese el id de la ruta'.

pasajeros := (Prompter prompt: 'Ingrese la cantidad de pasajeros') asNumber.
vehiculo := self buscarVehiculo: pasajeros.
vehiculo isNil ifTrue: [^MessageBox notify: 'No hay vehiculos disponibles para la cantidad de pasajeros especificada'] .

res:= Reserva new.

ruta := rutas detect: [ :unaRuta | (unaRuta id ) = idruta ].

res ruta:ruta.

res cantPasajeros: pasajeros.

dni := Prompter prompt: 'ingrese su dni'.
"El metodo detect devuelve un objeto."
usuario := usuarios detect: [ :unUsuario | (unUsuario dni ) = dni ] ifNone: [ nil ].
usuario isNil ifTrue: [self altaUsuario].
res usuario: usuario.

fecha:= Prompter prompt: 'ingrese la fecha'.
res fecha: (Date fromString: fecha).

res id: (reservas size) + 1.

reservas add: res.!

altaReserva: cosa
|res |
res:= Reserva new.
res ruta: ( Prompter prompt: 'Ingrese id de la ruta').
res fecha: ((Prompter prompt: 'Ingrese la fecha del viaje')asDate).
"res ruta: ruta.
res vehiculo: vehiculo.
res usuario: usuario."

res cantPasajeros.
reservas add: res.
!

altaRuta
|ruta|
ruta:= Ruta new.
ruta cargaDatos.
rutas add: ruta.!

altaUsuario
|usuario|
usuario:= Usuario new.
usuario cargaDatos.
usuarios add: usuario.!

altaVehiculo
|vehiculo tipo|
tipo := Prompter prompt: 'ingrese 1 para vehiculo estandar o 2 para vehiculo de lujo'.
tipo = '1'
ifTrue: [vehiculo := Estandar new]
ifFalse: [vehiculo := Lujo new].
vehiculo cargaDatos.
vehiculos add: vehiculo.!

buscarUsuario: dniUsuario
	| i largo|
	i:=1.
	largo := usuarios size.
	[(i < largo) & (((usuarios at: i) dni)~= dniUsuario)  ] whileTrue: [ i:=i+1].
	
	((largo == i) & ((usuarios at: i)dni ~=dniUsuario)) ifTrue: [i:=0].

	^i.!

buscarVehiculo: pasajeros
	| i largo|
	i:=1.
	largo := vehiculos size.
	[(i < largo) & (((vehiculos at: i) maxPasajeros )>= pasajeros )  ] whileTrue: [ i:=i+1].
	
	((largo == i) & (((vehiculos at: i) maxPasajeros ) < pasajeros) ) ifTrue: [i:=0].

	^i.
	!

crearDatosDePrueba
| vehiculo ruta |
	vehiculo := Estandar new.
	vehiculo id: 1.
	vehiculo marca: 'Toyota'.
	vehiculo modelo: 'Corolla'.
	vehiculo chofer: 'Juan'.
	vehiculo estado:  1.
	vehiculo maxPasajeros: 4.
	vehiculo precioKm: 40.
	vehiculos add: vehiculo.

	vehiculo := Lujo new.
	vehiculo id: 2.
	vehiculo marca: 'BMW'.
	vehiculo modelo: '250'.
	vehiculo chofer: 'Jose'.
	vehiculo estado:  1.
	vehiculo maxPasajeros: 3.
	vehiculo precioKm: 60.
	vehiculos add: vehiculo.

	vehiculo := Estandar  new.
	vehiculo id: 2.
	vehiculo marca: 'Renault'.
	vehiculo modelo: 'Clio'.
	vehiculo chofer: 'Mario'.
	vehiculo estado:  1.
	vehiculo maxPasajeros: 3.
	vehiculo precioKm: 38.
	vehiculos add: vehiculo.

	ruta := Ruta new.
	ruta id: 1.
	ruta puntoInicio: 'Rosario'.
	ruta puntoFinal: 'BsAs'.
	ruta distancia: 400.
	rutas add: ruta.

	ruta := Ruta new.
	ruta id: 2.
	ruta puntoInicio: 'Rosario'.
	ruta puntoFinal: 'Cordoba'.
	ruta distancia: 350.
	rutas add: ruta.

	ruta := Ruta new.
	ruta id: 3.
	ruta puntoInicio: 'Rosario'.
	ruta puntoFinal: 'Santa Fe'.
	ruta distancia: 225.
	rutas add: ruta.
	!

init
	usuarios := OrderedCollection new.
	vehiculos := OrderedCollection new.
	reservas := OrderedCollection new.
	rutas := OrderedCollection new.!

menu
| op  res |

res := ChoicePrompter choices: #('1) Solicitar reserva.' '2) Listado de reservas.' '3) Agregar vehiculo.' '4) Salir').
op := (res first).

[ op = $4 ] whileFalse: [
(op == $1) ifTrue: [
	
	self altaReserva.
	"miEmpresa solicitarReserva." 
	"| ruta pasajeros id user vehiculo |
	ruta := Prompter prompt: 'Ingrese id de la ruta'.
	pasajeros := (Prompter prompt: 'Ingrese la cantidad de pasajeros') asNumber. 
	vehiculo := self buscarVehiculo: pasajeros.
	(vehiculo > 0) ifTrue: [
		user :=Prompter prompt: 'Ingrese su DNI'.
		res := self buscarUsuario: user.
		(res = 0) ifTrue: [
			self altaUsuario.
		].
		self altaReserva: ruta vehiculo: vehiculo usuario: user cantPasajeros: pasajeros.
	]

	ifFalse: [MessageBox notify: 'No hay vehiculos disponibles para la cantidad de pasajeros especificada' ] ."
	
	
	
].
	res := ChoicePrompter choices: #('1)  Solicitar reserva.' '2) Listado de reservas.' '3) Agregar vehiculo.' '4)Salir').
	op := (res first).
]!

solicitarReserva
	| ruta pasajeros id |
	ruta := Prompter prompt: 'Ingrese id de la ruta'.
	pasajeros := (Prompter prompt: 'Ingrese la cantidad de pasajeros') asNumber. 
	id := self buscarVehiculo: pasajeros.
	! !
!Empresa categoriesForMethods!
agregar:!public! !
altaReserva!public! !
altaReserva:!public! !
altaRuta!public! !
altaUsuario!public! !
altaVehiculo!public! !
buscarUsuario:!public! !
buscarVehiculo:!public! !
crearDatosDePrueba!public! !
init!public! !
menu!public! !
solicitarReserva!public! !
!

Reserva guid: (GUID fromString: '{e6274a1e-4d74-4b92-b7d5-20065e8fefa7}')!
Reserva comment: ''!
!Reserva categoriesForClass!Kernel-Objects! !
!Reserva methodsFor!

cantPasajeros
^cantPasajeros.!

cantPasajeros: cantidad
cantPasajeros:=cantidad.!

fecha
^fecha.!

fecha: unafecha
fecha:= unafecha.!

ruta
^ruta.!

ruta: unaruta
ruta := unaruta.!

usuario
^usuario!

usuario: unUsuario
usuario:= unUsuario.!

vehiculo
^vehiculo.!

vehiculo: unvehiculo
vehiculo:= unvehiculo.! !
!Reserva categoriesForMethods!
cantPasajeros!public! !
cantPasajeros:!public! !
fecha!public! !
fecha:!public! !
ruta!public! !
ruta:!public! !
usuario!public! !
usuario:!public! !
vehiculo!public! !
vehiculo:!public! !
!

Ruta guid: (GUID fromString: '{25d87daf-3183-48db-af2e-8c2c68e9be6b}')!
Ruta comment: ''!
!Ruta categoriesForClass!Kernel-Objects! !
!Ruta methodsFor!

cargaDatos
id:= Prompter prompt: 'ingrese el id'.
puntoInicio:= Prompter prompt: 'ingrese el punto de inicio'.
puntoFinal:= Prompter prompt: 'ingrese el punto final'.
distancia:= Prompter prompt: 'ingrese la distancia'.!

distancia
^distancia.!

distancia: dist
	distancia := dist.!

id
^id.!

id: unId
	id:= unId.!

puntoFinal
^puntoFinal.!

puntoFinal: final
	puntoFinal:=final.!

puntoInicio
^puntoInicio.!

puntoInicio: inicio
	puntoInicio:= inicio.! !
!Ruta categoriesForMethods!
cargaDatos!public! !
distancia!public! !
distancia:!public! !
id!public! !
id:!public! !
puntoFinal!public! !
puntoFinal:!public! !
puntoInicio!public! !
puntoInicio:!public! !
!

Usuario guid: (GUID fromString: '{8649aac4-806a-42ee-9723-835359330548}')!
Usuario comment: ''!
!Usuario categoriesForClass!Kernel-Objects! !
!Usuario methodsFor!

apellido
^apellido.!

apellido: unApellido
	apellido := unApellido.!

cargaDatos
	nombre:= Prompter prompt: 'Nombre del nuevo usuario'.
	apellido:= Prompter prompt: 'Apellido del nuevo usuario'.
	dni:= Prompter prompt: 'Dni del nuevo usuario'.!

crear
	nombre:= Prompter prompt: 'Nombre del nuevo usuario'.
	apellido:= Prompter prompt: 'Apellido del nuevo usuario'.
	dni:= Prompter prompt: 'Dni del nuevo usuario'.!

dni
^dni.!

dni: unDni
	dni := unDni.!

nombre
	^nombre.!

nombre: unNombre
	nombre := unNombre.! !
!Usuario categoriesForMethods!
apellido!public! !
apellido:!public! !
cargaDatos!public! !
crear!public! !
dni!public! !
dni:!public! !
nombre!public! !
nombre:!public! !
!

Vehiculo guid: (GUID fromString: '{850cd6b3-a183-4f19-9215-7188f6997598}')!
Vehiculo comment: ''!
!Vehiculo categoriesForClass!Kernel-Objects! !
!Vehiculo methodsFor!

cargaDatos
id:= Prompter prompt: 'ingrese el id'.
marca:= Prompter prompt: 'ingrese la marca'.
modelo:= Prompter prompt: 'ingrese el modelo'.
chofer:= Prompter prompt: 'ingrese el nombre y apellido del chofer'.
estado:= 1. "los posibles estados, según el enunciado, son disponible y no disponible. 1 para disponible, 0 para no disponible."
maxPasajeros:= (Prompter prompt: 'ingrese la cantidad máxima de pasajeros')asNumber.
precioKm:= (Prompter prompt: 'ingrese el precio por kilómetro')asFloat.
!

chofer
	^chofer.!

chofer: unChofer
	chofer := unChofer.!

estado
^estado.!

estado: unEstado
	estado:=unEstado.!

id
^id.
!

id: unId
 id := unId.!

marca
^marca.!

marca:  unaMarca
	marca := unaMarca.!

maxPasajeros
^maxPasajeros.!

maxPasajeros: pasajeros
	maxPasajeros := pasajeros.!

modelo
^modelo.!

modelo: unModelo
	modelo := unModelo.!

precioKm
^precioKm.!

precioKm: precio
	precioKm := precio.!

toggleEstado
	(estado == 1) ifTrue: [self estado: 0] ifFalse: [ self estado: 1 ].! !
!Vehiculo categoriesForMethods!
cargaDatos!public! !
chofer!public! !
chofer:!public! !
estado!public! !
estado:!public! !
id!public! !
id:!public! !
marca!public! !
marca:!public! !
maxPasajeros!public! !
maxPasajeros:!public! !
modelo!public! !
modelo:!public! !
precioKm!public! !
precioKm:!public! !
toggleEstado!public! !
!

Estandar guid: (GUID fromString: '{fd90603d-a96c-41db-ab58-899f82e77bd1}')!
Estandar comment: ''!
!Estandar categoriesForClass!Kernel-Objects! !
!Estandar methodsFor!

cargaDatos
super cargaDatos.!

esDeLujo
^false! !
!Estandar categoriesForMethods!
cargaDatos!public! !
esDeLujo!public! !
!

Lujo guid: (GUID fromString: '{1b18f29e-807e-4153-a612-6627fb07df15}')!
Lujo comment: ''!
!Lujo categoriesForClass!Kernel-Objects! !
!Lujo methodsFor!

cargaDatos
super cargaDatos.!

esDeLujo
^true! !
!Lujo categoriesForMethods!
cargaDatos!public! !
esDeLujo!public! !
!

"Binary Globals"!

