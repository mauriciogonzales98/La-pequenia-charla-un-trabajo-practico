| package |
package := Package name: 'TP-Gonzales-Montania-Tobarez-Zulliani-Neri'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Empresa;
	add: #Reserva;
	add: #Ruta;
	add: #Usuario;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'..\Object Arts\Dolphin\Base\Dolphin').

package!

"Class Definitions"!

Object subclass: #Empresa
	instanceVariableNames: 'usuarios vehiculos rutas reservas'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Reserva
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Ruta
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Usuario
	instanceVariableNames: ''
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

init
	usuarios := OrderedCollection new.
	vehiculos := OrderedCollection new.
	reservas := OrderedCollection new.
	rutas := OrderedCollection new.! !
!Empresa categoriesForMethods!
agregarUsuario:!public! !
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
"Binary Globals"!

