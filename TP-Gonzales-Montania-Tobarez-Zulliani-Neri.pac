| package |
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
	'..\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter').

package!

"Class Definitions"!

Object subclass: #Empresa
	instanceVariableNames: 'usuarios vehiculos rutas reservas'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Reserva
	instanceVariableNames: 'idRuta fecha idVehiculo cantPasajeros'
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
	instanceVariableNames: 'Descuento'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Vehiculo subclass: #Lujo
	instanceVariableNames: 'Seguro'
	classVariableNames: ''
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

agregarUsuario: usuario
	usuarios add: usuario.!

buscarUsuario: dniUsuario
	"Esto no funciona si no cuentra lo que busca pero no se por que todavia"
	| i largo|
	i:=1.
	largo := usuarios size.
	[(i < usuarios size) & (((usuarios at: i) dni)~= dniUsuario) ] whileTrue: [ i:=i+1].
	
	(largo < i) ifTrue: [i:=0].

	^i.
!

init
	usuarios := OrderedCollection new.
	vehiculos := OrderedCollection new.
	reservas := OrderedCollection new.
	rutas := OrderedCollection new.! !
!Empresa categoriesForMethods!
agregarUsuario:!public! !
buscarUsuario:!public! !
init!public! !
!

Reserva guid: (GUID fromString: '{e6274a1e-4d74-4b92-b7d5-20065e8fefa7}')!
Reserva comment: ''!
!Reserva categoriesForClass!Kernel-Objects! !
Ruta guid: (GUID fromString: '{25d87daf-3183-48db-af2e-8c2c68e9be6b}')!
Ruta comment: ''!
!Ruta categoriesForClass!Kernel-Objects! !
Usuario guid: (GUID fromString: '{8649aac4-806a-42ee-9723-835359330548}')!
Usuario comment: ''!
!Usuario categoriesForClass!Kernel-Objects! !
!Usuario methodsFor!

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
crear!public! !
dni!public! !
dni:!public! !
nombre!public! !
nombre:!public! !
!

Vehiculo guid: (GUID fromString: '{850cd6b3-a183-4f19-9215-7188f6997598}')!
Vehiculo comment: ''!
!Vehiculo categoriesForClass!Kernel-Objects! !
Estandar guid: (GUID fromString: '{fd90603d-a96c-41db-ab58-899f82e77bd1}')!
Estandar comment: ''!
!Estandar categoriesForClass!Kernel-Objects! !
Lujo guid: (GUID fromString: '{1b18f29e-807e-4153-a612-6627fb07df15}')!
Lujo comment: ''!
!Lujo categoriesForClass!Kernel-Objects! !
"Binary Globals"!

