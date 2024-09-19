﻿| package |
package := Package name: 'TP-Gonzales-Montaña-Tobarez-Zulliani-Neri'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Empresa;
	add: #Estandar;
	add: #Lujo;
	add: #Object;
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
	'..\Object Arts\Dolphin\Base\Dolphin').

package!

"Class Definitions"!

nil subclass: #Object
	instanceVariableNames: ''
	classVariableNames: '_AssertionFailureSignal _DependentsRegister _EventsRegister _PropertyRegister'
	poolDictionaries: '_InstanceBehaviorMasks'
	classInstanceVariableNames: ''!
Object subclass: #Empresa
	instanceVariableNames: 'nombre'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Reserva
	instanceVariableNames: 'idRuta fechaInicio fechaFin idVehiculo cantPasajeros'
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

Object guid: (GUID fromString: '{87b4c451-026e-11d3-9fd7-00a0cc3e4a32}')!
Object comment: 'Object is the abstract root of the standard Smalltalk class hierarchy. It has no instance variables (indeed it must not have any), but provides behavior common to all objects.

Instance Variables:
	<MUST BE NONE>

Class Variables:
	_AssertionFailureSignal 	<Signal> raised when assertion failures occur (see #assert:)
	_DependentsRegister	<WeakIdentityDictionary> containing DependentsCollections for instances
	_EventsRegister 		<WeakIdentityDictionary> containing EventsCollections for instances
	_PropertyRegister 		<PropertyManager> Register of instance specific information not stored in instance variables

The following Instance specific behaviour mask constants are held in the PoolConstantsDictionary _InstanceBehaviorMasks in order that they may be readily shared into user defined root classes.
	_FinalizeMask 		<Integer> bit mask to set/reset the finalize mark of instances
	_GetSpecialMask 		<Integer> bit mask to retrieve special behavior flags of instances
	_WeakMask 		<Integer> bit mask to use to set/reset the weak mark of instances. Includes pointer bit.

Note: All class variables beginning with $_ are private to the implementation. This convention is adopted to avoid potential name clashes with user defined classes, and is a requirement for ANSI compliance.

Object implements the ANSI protocol <Object> (browse the protocols-Object category).

The following messages defined in Object have optimized implementations inlined by the Compiler and cannot be overridden:
	#==
	#basicAt:			(overridable if subclass not indexable)
	#basicAt:put:		(ditto)
	#basicSize
	#basicClass
	#isNil
	#notNil
	#yourself
In addition any selector in Object with a ''basic'' prefix may be subject to inlining in future releases, so these should not be overridden.
'!
!Object categoriesForClass!Kernel-Objects! !
!Object methodsFor!

?? anObject
	"Answer the receiver if not nil, else the operand."

	^self!

_deepCopy: copiesDictionary 
	"Private - Answer a 'deep copy' of the receiver, cloning only those parts not already included
	in the IdentityDictionary argument, copiesDictionary. This method implements the
	body of #deepCopy, and is sufficient for all objects except those holding external 
	resources (where that resource should probably be cloned too), and those where there 
	are circular references from an object to a child and vice versa, and that reference must be
	correctly maintained. In general you should override #deepenShallowCopies:trail: as that
	is easier."

	^copiesDictionary at: self
		ifAbsent: 
			[| clone |
			clone := self shallowCopy postCopy.
			copiesDictionary at: self put: clone.
			(clone == self or: [self class isBytes]) 
				ifTrue: [clone	"no further copying required"]
				ifFalse: 
					[copiesDictionary at: clone put: clone.	"#2198"
					self _deepenShallowCopy: clone trail: copiesDictionary]]!

_deepenShallowCopy: clone trail: copiesDictionary
	"Private - Deepen the argument, clone, which is a shallow copy of the receiver.
	Answer the deepened shallow copy (or another object to represent the deep copy
	if you so desire - though if you do this you must update the copiesDictionary).
	Generally speaking, this is the method which you should override if you need to
	implement deep copy functionality, as this leaves all the boilerplate to the 
	default implementation in Object."

	1 to: self class instSize + self basicSize do: [:i |
		clone instVarAt: i put: ((clone instVarAt: i) _deepCopy: copiesDictionary)].
	^clone!

_primitiveError: anInteger at: index
	"Private - An at: operation on the receiver failed. Determine the cause of the error, and raise an appropriate error."

	anInteger == _PrimitiveFailureCode.InvalidParameter1 ifTrue: [^Error nonIntegerIndex: index].
	anInteger == _PrimitiveFailureCode.OutOfBounds ifTrue: [^self errorSubscriptBounds: index].
	anInteger == _PrimitiveFailureCode.ObjectTypeMismatch ifTrue: [^Error notIndexable: self].
	^self primitiveFailed: anInteger!

_primitiveError: anInteger at: index put: value
	"Private - An at:put: operation on the receiver failed. Determine the cause of the error, and raise an appropriate error."

	anInteger == _PrimitiveFailureCode.AccessViolation ifTrue: [^Processor constWriteSignal signalWith: self].
	anInteger == _PrimitiveFailureCode.InvalidParameter1 ifTrue: [^Error nonIntegerIndex: index].
	anInteger == _PrimitiveFailureCode.OutOfBounds ifTrue: [^self errorSubscriptBounds: index].
	anInteger == _PrimitiveFailureCode.ObjectTypeMismatch ifTrue: [^Error notIndexable: self].
	^self primitiveFailed: anInteger!

~~ comparand
	"Answer whether the <Object>, comparand,  is NOT identical to the receiver.

	N.B. This implementation cannot be overridden, and is never, in fact, received (unless
	#perform'd), because #~~ is inlined by the Compiler and implemented by a specific VM
	instruction."

	^(self == comparand) not!

~= comparand
	"Answer whether the <Object>, comparand, is NOT equivalent to the receiver."

	^(self = comparand) not!

= comparand
	"Answer whether the receiver and the <Object>, comparand, 
	are considered equivalent (in whatever respect is appropriate for 
	the class of the receiver).

	By default two objects are equal if they are identical. This is the
	standard Smalltalk definition, though a better one is:
		Two objects are equal if they are of the same species and
		their contents are equal.
	but this is a recursive definition, and is quite slow to implement in
	general.

	The identity primitive should NOT fail (so there are no primitive failure
	results).
	
	N.B. Equivalent objects (i.e. those that answer true for #=) MUST
	answer the same hash value, in order that they can be stored and
	retrieved successfully from hashed collections. Therefore, classes 
	which reimplement either #= or #hash, will probably need to 
	reimplement both."

	<primitive: 110>
	^self primitiveFailed: _failureCode!

== comparand
	"Answer whether the <Object>, comparand, is the same, identical, 
	object as the receiver. 
	
	The primitive should NOT fail.
	
	N.B. This implementation cannot be overridden, and is never, in fact, received 
	(unless #perform'd), because #== is inlined by the Compiler."

	<primitive: 110>
	^self primitiveFailed: _failureCode!

-> anObject 
	"Answer an Association with the receiver as the key, and anObject as the value"

	^Association key: self value: anObject!

addDependent: anObject 
	"Include anObject as one of the dependents of the receiver. anObject will subsequently
	receive update messages when the receiver changes (see change and update).
	Uses the private dependents accessing methods #[get|set]Dependents.
	Note that the reference is weak, and will not prevent anObject being GC'd."

	| dependents |
	(dependents := self getDependents) isNil 
		ifTrue: 
			[dependents := WeakArray new.
			self setDependents: dependents].
	^dependents add: anObject!

allReferences
	"Answer an Array containing all objects which reference the receiver.
	The primitive should not fail."

	^self allReferences: true!

allReferences: aBoolean
	"Answer an Array containing all objects which reference the receiver, including weak
	references if the <boolean> argument is true. The primitive should not fail."

	<primitive: 153>
	^self primitiveFailed: _failureCode!

appendToStream: puttableStream
	"Private - Append the receiver's elements to the argument, puttableStream.
	Answer the receiver.
	Implementation note: Double dispatched from streams."

	puttableStream nextPut: self!

asParameter
	"Answer the receiver in a form suitable for passing to an external function
	primitive method (see ExternalLibrary and subclasses). The default is self."

	^self!

assert: aBlock
	"Evaluates aBlock and signals an error if the result is not true. The default action is to bring up a
	resumable walkback."

	aBlock value ifFalse: [_AssertionFailureSignal signal]!

asUIntPtr
	"Answer the receiver in a form suitable for passing/returning as a Windows LRESULT
	(32 or 64-bit, depending on host OS) return value. The default is self (which will cause the
	default window proc. of the window to be called for most objects other than Integers when
	used as a return value)."

	^self!

at: index
	"Answer the receiver's indexed instance variable at the argument index.
	As basicAt:, but may be reimplemented."

	"Primitive Failure Reasons:
		InvalidParameter1	- aSmallInteger is not a SmallInteger
		OutOfBounds		- aSmallInteger out of bounds (not in the range 1..receiver's indexable size)"

	<primitive: 60>
	^self _primitiveError: _failureCode at: index!

at: index put: value
	"Replace the receivers indexed instance variable at the argument, index, with the argument, value. Answer value.
	As basicAt:put: but may be reimplemented."

	"Primitive Failure Reasons:
		InvalidParameter1	- aSmallInteger is not a SmallInteger
		OutOfBounds		- aSmallInteger out of bounds (not in the range 1..receiver's indexable size) 
		InvalidParameter2	- the argument, value, is not of a class which can be stored in the receiver (e.g. its a non-SmallInteger and the receiver is a ByteArray).
		IntegerOutOfRange	- the argument is an integer that is out of range when storing into a byte object"

	<primitive: 61>
	^self
		_primitiveError: _failureCode
		at: index
		put: value!

basicAt: aSmallInteger
	"Private - Answer the receiver's indexed instance variable at the argument index.
	MUST not be reimplemented (except by classes whose instances have immediate representations such as SmallInteger).

	Primitive Failure Reasons:
		InvalidParameter1	- aSmallInteger is not a SmallInteger
		OutOfBounds		- aSmallInteger out of bounds (not in the range 1..receiver's indexable size)"

	"Implementation Note: This message is inlined by the compiler, and is never sent unless directly performed, or unless the inlined code detects an error (such as an out-of-bounds index). It is not possible to override this message successfully."

	<primitive: 60>
	^self _primitiveError: _failureCode at: aSmallInteger!

basicAt: aSmallInteger put: value
	"Private - Replace the receivers indexed instance variable at the argument, index, with the argument, value. Answer value. 
	MUST not be reimplemented (except by classes whose instances have immediate representations	such as SmallInteger)."

	"Primitive Failure Reasons:
		InvalidParameter1	- aSmallInteger is not a SmallInteger
		OutOfBounds		- aSmallInteger out of bounds (not in the range 1..receiver's indexable size) 
		InvalidParameter2	- the argument, value, is not of a class which can be stored in the receiver (e.g. its a non-SmallInteger and the receiver is a ByteArray).
		IntegerOutOfRange	- the argument is an integer that is out of range when storing into a byte object"

	"Implementation Note: This message is inlined by the compiler, and is never sent unless directly performed, or unless the inlined code detects an error (such as an out-of-bounds index). It is not possible to override this message successfully."

	<primitive: 61>
	^self
		_primitiveError: _failureCode
		at: aSmallInteger
		put: value!

basicClass
	"Answer a <classDescription> which is the class of the receiver.
	The primitive should not fail."

	"Implementation Note: This message cannot be overridden and always 
	answers the actual class of the receiver, unlike #class which might answer 
	the class of a different object (e.g. in the case of proxies).,"

	<primitive: 111>
	^self primitiveFailed: _failureCode!

basicDoesNotUnderstand: failedMessage
	"A message sent to the receiver was not implemented by the receiver or its superclasses 
	(i.e. it has no appropriate behaviour). This message is useful for by-passing a superclass'
	implementation of #doesNotUnderstand:, as it must not be overridden by subclasses.
	Signal a <MessageNotUnderstood> exception corresponding to the <failedMessage> argument,
	message."

	^MessageNotUnderstood receiver: self message: failedMessage!

basicIdentityHash
	"Answer the <integer> identity hash value for the receiver. This is
	currently a 16-bit SmallInteger value, which is always positive (although
	note that SmallInteger's override this implementation to answer 
	themselves and hence an arbitrary object's identity hash is only 
	guaranteed to be an integer). The value is a pseudo-random number 
	assigned on first request, and it never changes (i.e. it is temporally 
	invariant). Because the range is limited to 16-bits, very large collections 
	hashed by identity using this value alone may be slow to access. One could 
	consider including the identityHash of the objects class e.g. 
		^((self class basicIdentityHash bitAnd: 16r3FFFFFFF) bitShift: 16) 
			bitOr: self basicIdentityHash
	However, this would not be safe in general, because #become: and #becomeA:
	might change an object's class, (an object's class is an attribute of the object
	not it's identity).

	Although this implementation is temporally invariant while an object remains
	in memory, a binary filed object is re-incarnated with a different identity,
	and so identity hash collections must be rebuilt or rehashed on load (the 
	standard Collections do this already).

	This need not be reimplemented (except by immediate subclasses), because 
	it is not possible to override #==, indeed reimplementation is jolly unwise.
	
	N.B. The primitive does not fail, but will raise a benign invalid memory access 
	exception if called for immediate subclasses such as SmallInteger."

	<primitive: 75>
	^self primitiveFailed: _failureCode!

basicIdentityIndexOf: anElement from: start to: stop
	"Private - Answer the index of the next occurrence of anElement in the receiver's indexable
	variables between startIndex and stopIndex inclusive. If there are no such occurrences, answer 0.
	This is intended to assist in the private implementation of some indexable Classes (esp. those which 
	are Weak)	by providing a very fast means of serially searching them, but it requires knowledge of the 
	internal implementation of those Classes to be used correctly, and is therefore private. It can be 
	used directly for instances of classes like Array.

	Primitive fail reasons:

		0 -	start is not a SmallInteger
		1 -	stop is not a SmallInteger
		2 -	start and/or stop is/are outside the indexable bounds of the receiver (1..indexable size)

	The primitive does not fail if the indices are out of bounds but do not specify a valid range - this 
	behavior can be useful when repetitively searching through an object as it simplifies the termination 
	condition (e.g. See WeakArray>>corpsesDo:)."

	<primitive: 59>
	| index |
	index := start.
	[index > stop] whileFalse: 
			[(self basicAt: index) == anElement ifTrue: [^index].
			index := index + 1].
	^0!

basicPrintOn: aStream
	"Append a short developer's description of the receiver to aStream. 
	Should not be overridden by subclasses."

	| name |
	name := self basicClass name.
	aStream 
		nextPutAll: (name first isVowel ifTrue: ['an '] ifFalse: ['a ']);
		nextPutAll: name!

basicPrintString
	"Answer a short developer's String description of the receiver. 
	Should not be overridden by subclasses"

	| aStream |
	aStream := String writeStream: 16.
	self basicPrintOn: aStream.
	^aStream contents!

basicResize: anInteger
	"Private - Resize the receiver to accomodate anInteger indexable instance variables. 
	As #resize:, but not to be overridden.

	Primitive failure reason:
		0 -	anInteger is not a positive SmallInteger
		1 -	the receiver is not of an indexable (variable sized) class."

	<primitive: 101>
	| answer |
	self isImmutable ifTrue: [Processor constWriteSignal signalWith: self].
	answer := self class new: anInteger.
	1 to: anInteger do: [:i | answer basicAt: i put: (self basicAt: i)].
	self become: answer!

basicShallowCopy
	"Private - Answer a copy of the receiver which shares the receiver's instance 
	variables. This implementation suffices for most objects.
	The primitive does not fail."

	<primitive: 155>
	| class copy size |
	class := self basicClass.
	size := self basicSize.
	copy := class isVariable ifTrue: [class basicNew: size] ifFalse: [class basicNew].
	size := size + class instSize.
	1 to: size do: [:i | copy instVarAt: i put: (self instVarAt: i)].
	^copy!

basicSize
	"Private - Sames as #size, but should not be overridden by subclasses (except by subclasses
	whose instances have an immediate representation - e.g. SmallInteger).

	The primitive should not fail. It must be overridden for immediate objects."

	<primitive: 62>
	^self primitiveFailed: _failureCode!

basicYourAddress
	"Private - See #yourAddress. Must not be reimplemented (except by subclasses whose
	instances have immediate representations, e.g. SmallInteger)."

	<primitive: 103>
	^self primitiveFailed: _failureCode!

become: anObject
	"Swap the instance pointers of the receiver and the argument, anObject. All variables in the entire system that pointed to the receiver will now point to the argument, and vice versa.

	Primitive failure reasons:
		ObjectTypeMismatch - receiver or argument an object with an immediate representation (e.g. a SmallInteger), or either is a 'permanent' objects (nil, true, false, etc).

	This method should be used with extreme care, as it has side effects for others referring to the receiver and anObject. In particular never attempt to pass nil, true, false, etc, as the argument, as this will almost certainly cause system failure.

	N.B. Though Dolphin is faithful to the original Smalltalk-80 specification for this method, and provides a two way switch as described, this is not universally true for all Smalltalks, so portable code should assume only a one way switch. To better guarantee portability you should use #swappingBecome: which, hopefully, will start to become prevalent on other platforms."

	<primitive: 72>
	^self primitiveFailed: _failureCode!

becomeA: aClass
	"Change the class of the receiver to aClass, iff they are of the same 'shape' - e.g. pointer objects cannot be converted to byte objects and vice versa.
	
	SmallIntegers	can be mutated to new byte objects which are always of length 4.
	
	Primitive failure reasons:
		InvalidParameter1	- argument, aClass, is not a Behavior
		ObjectTypeMismatch	- receiver's class and aClass are not the same shape.
		
	Consider carefully before using this method as although it may improve performance, it has potential side effects similar to those of #become:. As a rule of thumb, send #becomeA: only to objects of known ownership (e.g. temporaries). Changing the class of  objects passed as parameters could well confuse the other objects referencing those parameters. 

	It is always safe to change the class of a SmallInteger, since a new object is created of the specified variable byte class to hold the value of the SmallInteger."

	<primitive: 102>
	^self primitiveFailed: _failureCode!

becomeAn: aClass
	"Sigh, just to keep Russ (aka The Grammar Pedant) happy."

	^self becomeA: aClass!

beFinalizable
	"Mark the receiver as an object requiring finalization.
	Answers the previous value of the special behavior mask."

	^self setSpecialBehavior: ##(_GetSpecialMask bitOr: _FinalizeMask)!

beStrong
	"Revoke the receiver's status as an object whose indexable pointer variables hold
	only weak references to their contents. Has no effect on objects which are already strong.
	Answers the previous value of the special behavior mask."

	^self setSpecialBehavior: ##(_GetSpecialMask bitXor: (_WeakMask bitShift: 8))!

beUnfinalizable
	"Mark the receiver as an object that does not require finalization. This is the default
	so sending this message is only necessary to reverse a previous #beFinalizable message.
	Answers the previous value of the special behavior mask."

	^self setSpecialBehavior: ##(_GetSpecialMask bitXor: (_FinalizeMask bitShift: 8))!

beWeak
	"Mark the receiver as an object whose indexable variables hold only weak references to
	their contents: that is those variables contents could be garbage collected and replaced
	with the corpse object. When this happens, the receiver will subsequently receive an
	#elementsExpired: message informing of the number of losses it suffered. It is up to the 
	receiver to take appropriate action to locate the corpses and act accordingly, e.g. by 
	turning them into nils, or just updating a tally. 
	Any object of any pointer class may be made weak, but there will be no useful effect 
	for those instances without indexable variables, and this will increase garbage collection 
	overhead. Classes which wish all their instances to be weak, should invoke this method 
	against all newly created instances."

	^self class isPointers
		ifTrue: [self setSpecialBehavior: ##(_GetSpecialMask bitOr: _WeakMask)]
		ifFalse: [self error: 'byte objects cannot be weak']!

binaryStoreBytes
	"Answers a ByteArray representation of the receiver stored in a binary form.
	This can be reconstituted using Object class>>fromBinaryStoreBytes:"

	| stream |
	stream := ByteArray writeStream: 256.
	self binaryStoreOn: stream.
	^stream contents!

binaryStoreOn: aStream
	"Stores the receiver in a binary form on aStream that can be reconstituted using Object class>>binaryReadFrom:.
	Uses the STB filing mechanism to achieve this. This implementation is sufficient for all objects
	that do not need to isolate themselves from their surroundings. Sub-classes may override this
	method to perform such isolation"

	(STBOutFiler on: aStream) nextPut: self.
!

breakDependents
	"Break the connection with all objects which have registered a dependency on the reciever."

	self setDependents: nil!

broadcast: aSymbol
	"Send the argument aSymbol as a unary message to all of the receiver's dependents"

	self dependents nonCorpsesDo: [:dependent | 
		dependent perform: aSymbol]!

broadcast: aSymbol with: aParameter
	"Send the argument aSymbol as a keyword message with argument aParameter
	 to all of the receiver's dependents"

	self dependents nonCorpsesDo: [:dependent | 
		dependent perform: aSymbol with: aParameter]!

changed
	"The receiver changed in some general way; inform all the dependents by sending 
	each of them an #update: message with nil as an argument."

	self changed: nil!

changed: anAspect
	"The receiver changed; the change is denoted by the argument, anAspect. 
	Usually the argument is a Symbol that is part of the dependent's change 
	protocol, but it may be any object which gives a hint as to the type of change"

	self changed: anAspect with: nil!

changed: anAspect with: aParameter
	"The receiver changed; the change is denoted by the argument, anAspect and an 
	argument in aParameter."

	self dependents nonCorpsesDo: [ :dependent | 
		dependent update: anAspect with: aParameter from: self]!

class
	"Answer a <classDescription> which is the class of the receiver.
	The primitive should not fail."

	<primitive: 111>
	^self primitiveFailed: _failureCode!

copy
	"Answer an <Object> which is a copy of the receiver (by default a copy which shares the receiver's 
	instance variables). This may be reimplemented to return a deep copy, or some other 
	form of copy (e.g. a 2-level copy, or, for an identify object, the same object), whatever
	is appropriate for the receiver."

	#todo "This is a fragile implementation of an ANSI method (breakable by subclasses), and hence the selectors need _ prefixes".
	^self shallowCopy postCopy.!

deepCopy
	"Answer a 'deep copy' of the receiver. The 'deep copy' is a clone of the receiver,
	sharing only those parts which cannot be copied (e.g. classes, nil, true, false, 
	SmallIntegers, Symbols, Characters, etc).
	This is sufficient for all objects except those holding external resources (where a 
	true deepCopy will clone that resource too), and those where there are circular
	references from an object to a child and vice versa, and that reference must be
	correctly maintained. In these circumstances it is appropriate to override
	#_deepCopy:, which implements the body of the method. You should generally not override
	#deepCopy."

	^self _deepCopy: IdentityDictionary new!

dependents
	"Answer a Collection of the receiver's dependents. Portable code should make no assumptions
	about the ordering of the Collection (or its type), and must not modify it."

	| dependents |
	^(dependents := self getDependents) isNil
		ifTrue: [WeakArray new]
		ifFalse: [dependents]!

displayOn: aStream
	"Append, to aStream, a String whose characters are a representation of the receiver as a user
	would want to see it."

	self printOn: aStream
!

displayString
	"Answer a String whose characters are a representation of the receiver as a user
	would want to see it.
	N.B. Subclasses should override #displayOn: to provide suitable implementations. 
	You may also want to override #displayString for performance reasons in certain 
	situations, because using a Stream can be a significant overhead where one 
	simply wants the display string of a single object. However, if you override
	#displayString you should also override #displayOn: to provide the same
	representation."

	| stream |
	stream := String writeStream: 32.
	self displayOn: stream.
	^stream contents
!

doesNotUnderstand: failedMessage
	"Sent to the receiver by the VM when a message sent to the receiver was not implemented
	by the receiver or its superclasses (i.e. it has no appropriate behaviour).
	Signal a <MessageNotUnderstood> exception corresponding to the <failedMessage> argument,
	message."

	^MessageNotUnderstood receiver: self message: failedMessage
!

error: signalerText
	"Raise an <Error> exception reporting the error message contained in the
	<readableString> argument, signalerText."

	^Error signal: signalerText!

errorCantHold: anObject
	"Raise an error that the receiver cannot hold anObject (as it is of the wrong type)"

	^self error: ('Can''t hold <1p>' expandMacrosWith: anObject)!

errorNotFound: anObject
	"Raise a NotFoundError indicating that anObject was not found 
	in the receiver"

	^NotFoundError new
		receiver: self;
		signalWith: anObject!

errorSubscriptBounds: anInteger
	"Raise a BoundsError because anInteger is outside the subscript bounds of the receiver."

	^BoundsError new
		receiver: self;
		signalWith: anInteger!

events
	"Answer a Collection of the receiver's events"

	| events |
	^(events := self getEvents) isNil
		ifTrue: [NullEventsCollection current]
		ifFalse: [events]!

expandMacrosIn: aString

	"Private - Expand aString with the replaceable argument represented by the receiver."

	^aString expandMacrosWith: self!

finalize
	"Perform any death-bed operations as the receiver is about to expire. The default is to
	do nothing.

	It is not necessary to remove an objects finalization mark, since this has already been
	done by the garbage collector. Should you wish an object to be finalized again, you must
	send it #beFinalizable again (this can be done from the #finalize message, but be careful
	as this may leave the object in an endless loop of finalizations, consuming system resources).

	The receiver will cease to exist at some time after its finalize method has completed (at
	the very latest at the next GC), unless that method causes additional references to be 
	taken to the receiver.

	Note that this method is only sent to objects which are marked as requiring
	finalization (see #beFinalizable) when their last strong reference is removed. The
	object will not receive the message immediately, but only on the next run of the 
	Finalizer process (which runs at a low priority), and if the object has outstanding 
	weak references, only then after a run of the full garbage collector (which is necessarily 
	a relatively infrequent occurrence)."

	self free!

free
	"Free any external resources associated with the receiver. Implementations should only
	perform the free operation if valid - i.e. multiple-free's are permissible, it is the
	responsibility of the implementor of free to guard against this, not the callers'. See the
	Object Liberation Strategy pattern for further details."

	!

getDependents
	"Private - Answer the DependentsCollection belonging to the receiver, or nil if the receiver
	has no dependents. Subclasses may override this if they wish to provide their own storage
	for dependents (which is more efficient)."

	^_DependentsRegister lookup: self!

getEvents
	"Private - Answer the EventsCollection belonging to the receiver, or nil if the receiver
	has no events registered for it"

	^_EventsRegister lookup: self!

getSpecialBehavior
	"Private - Answer the receiver's complete special behavior mask,
	useful for transferring to copies, etc."

	^self setSpecialBehavior: _GetSpecialMask!

hash
	"Answer the <integer> hash value for the receiver. By default use the identity hash assigned
	at object creation time, which is temporally invariant. See #identityHash for more details.

	Equivalent objects (i.e. those that answer true for #=) MUST answer the same hash value,
	in order that they can be stored and retrieved successfully from hashed collections.
	Therefore, classes which reimplement either #= or #hash, will probably need to reimplement
	both.

	N.B. The primitive does not fail, but will raise an invalid memory access exception if
	called for immediate subclasses such as SmallInteger."

	<primitive: 147>
	^self identityHash!

identityHash
	"Answer the <integer> identity hash value for the receiver. Be aware that this is based on a
	16-bit integer randomly generated for each object on first request, so there are only 65536
	unique values. The hash is scaled to a 30-bit positive SmallInteger to avoid closely grouped
	objects in large hashed collections with internal overflow, which causes extremely poor
	performance. See #basicIdentityHash for further details."
	
	<primitive: 147>
	^self basicIdentityHash bitShift: 14!

ifNil: nilBlock 
	"If the receiver is the nil object, then answer the result of evaluating the
	<niladicValuable>, nilBlock, otherwise answer the receiver."

	"Implementation Note: This message is normally inlined by the compiler and so is never sent
	unless #perform'd."

	^self!

ifNil: nilBlock ifNotNil: notNilBlock 
	"If the receiver is the nil object, then answer the result of evaluating the
	<niladicValuable>, nilBlock, otherwise answer the result of evaluating the <valuable>,
	notNilBlock. notNilBlock can be a <niladicValuable> or a <monadicValuable>, in which case it
	is evaluated with the receiver as its argument."

	"Implementation Note: This message is normally inlined by the compiler and so is never sent
	unless #perform'd."

	^notNilBlock cull: self!

ifNotNil: notNilBlock 
	"If the receiver is not the nil object, then answer the result of evaluating the valuable
	argument, notNilBlock, otherwise answer nil. notNilBlock can be a <niladicValuable> or a
	<monadicValuable>, in which case it is evaluated with the receiver as its argument."

	"Implementation Note: This message is normally inlined by the compiler and so is never sent
	unless #perform'd."

	^notNilBlock cull: self!

ifNotNil: notNilBlock ifNil: nilBlock 
	"If the receiver is the nil object, then answer the result of evaluating the
	<niladicValuable>, nilBlock, otherwise answer the result of evaluating the <valuable>,
	notNilBlock. notNilBlock can be a <niladicValuable> or a <monadicValuable>, in which case it
	is evaluated with the receiver as its argument."

	"Implementation Note: This message is normally inlined by the compiler and so is never sent
	unless #perform'd."

	^notNilBlock cull: self!

initialize
	"Initialise the receiver following instantiation. The default is to do nothing.
	Answer the receiver."

	^self!

instVarAt: index
	"Private - Answer a variable in the receiver. The numbering of the variables begins with named instance variables, and corresponds to the order in which the instance variables were defined. Indexed variables have indices following those of the named instance variables."

	"Primitive failure reasons:
		InvalidParameter1	- aSmallInteger is not a SmallInteger.
		OutOfBounds		- aSmallInteger is out of bounds (not in the range 1..recieiver's size)."

	<primitive: 73>
	_failureCode == _PrimitiveFailureCode.OutOfBounds ifTrue: [^self errorSubscriptBounds: index].
	_failureCode == _PrimitiveFailureCode.InvalidParameter1 ifTrue: [^Error nonIntegerIndex: index].
	^self primitiveFailed: _failureCode!

instVarAt: index put: value
	"Private - Store the argument, value, into a named variable in the receiver. The numbering of the variables begines with named instance variables, and corresponds to the order in which the instance variables were defined. Indexed variables have indices following those of the named instance variables."

	"Primitive failure reasons:
		InvalidParameter1	- aSmallInteger is not a SmallInteger.
		OutOfBounds		- aSmallInteger is out of bounds (not in the range 1..receiver's mutable size)
		InvalidParameter2	- the argument, value, is a type of object which cannot be stored in the receiver."

	<primitive: 74>
	^self
		_primitiveError: _failureCode
		at: index
		put: value!

instVarNamed: aString
	"Answer the value of the named instance variable of the receiver.
	Note that this is a slow and inelegant way to access instance variables,
	and so its should be reserved mainly for testing, debugging, and tools."

	^self instVarAt: (self class indexOfInstVar: aString)!

isAtomic
	"Answer whether or not the receiver is the single unique instance of its class that can
	represents its value. For example, <Symbol>s are always atomic, so #a == 'a' asSymbol, but
	<string>s in general are not atomic."

	^false!

isCharacter
	"Answer whether the receiver conforms to the <Character> protocol."

	^false!

isFinalizable
	"Answer whether the receiver is marked as requiring finalization.
	Finalizable objects will receive a #finalize message after the garbage
	collector has determined that there are no outstanding references
	to the object, however the delivery of the message is asynchronous
	and an arbitrary interval may elapse before it is delivered."

	^self getSpecialBehavior allMask: _FinalizeMask!

isImmediate
	"Private - Answer whether the receiver has an immediate representation (that is it is entirely
	encoded in an object pointer, e.g. SmallIntegers. Most objects are not immediate."

	^false
!

isImmutable
	"Answer whether the receiver is a constant object, for example a compiled literal."

	<primitive: 177>
	^self primitiveFailed: _failureCode!

isImmutable: aBoolean
	"Set whether the receiver is a constant object. Any attempt to write to either named or
	indexable instance variables of a constant object will result in an exception. The primitive
	will fail if the receiver is a permanently immutable object such as a <SmallInteger> arnd
	the argument is not 'true'."

	<primitive: 178>
	^self primitiveFailed: _failureCode!

isIndexable
	"Answer whether or not the receiver has indexable instance variables (in addition
	to any named instance variables), and can be accessed using #at:/#at:put:"

	^self class isVariable!

isInteger
	"Answer whether the receiver is a kind of Integer"

	^false
!

isKindOf: candidateClass
	"Answer whether the receiver is an instance of the argument, candidateClass,
	or one of its subclasses.
	The primitive never fails, so the Smalltalk back up code is present for illustrative
	purposes only. The primitive is very fast, so there is no particular reason to
	implement isXXXXXX methods instead, BUT in any case is-kind-of tests are not
	good practice. Tests should be made to see if an object provides a particular
	protocol (if necessary) rather than testing for a particular class."

	<primitive: 57>
	^self class includesBehavior: candidateClass!

isLiteral
	"Answer whether or not the receiver has a literal representation (probably its
	printString) which is directly recognised by the Compiler"

	^false!

isMemberOf: candidateClass
	"Answer whether the receiver is an instance of the argument, 
	candidateClass."

	^self class == candidateClass!

isNil
	"Answer whether the receiver is THE undefined (nil) object.
	N.B. This message is inlined by the compiler and cannot be overridden."

	^false!

isNumber
	"Coerces numbers to true and everything else to false. Number 
	overrides with ^true"

	^false!

isString
	"Answer whether the receiver is a <readableString>."

	^false!

isSymbol
	"Dolphin doesn't usually include these dubious type tests, but they are used by a number of
	add-on libraries, so we have begrudgingly accepted them into the base."

	^false!

isWeak
	"Answer whether the receiver is an object whose indexable pointer variables hold only weak references
	to their contents."

	^self getSpecialBehavior allMask: _WeakMask!

mustBeBoolean
	"Private - Sent to the receiver by the VM when an attempt was made to test it for its
	boolean status by a CompiledMethod, e.g:

			[1] whileTrue: [ ... ].

	By default an error is raised, but this can be overridden if appropriate, however overrides
	must return true or false to avoid causing an infinite loop. The conditional test which
	raised the error is repeated if #mustBeBoolean returns (i.e. the instruction pointer is not
	advanced over the conditional test that failed), and this may generate a further
	#mustBeBoolean messages if the return value is not itself a <Boolean>."

	^(self error: 'Must be boolean') == true!

noEventsDo: aBlock
	"Evaluate aBlock while ensuring that the receiver will not trigger any events.
	Answers the result of evaluating aBlock"

	| events |
	events := self getEvents.
	^
	[self setEvents: nil.
	aBlock value] ensure: [self setEvents: events]!

notNil
	"Answer whether the receiver is not the undefined (<nil>) object.
	N.B. This message is inlined by the compiler and cannot be overridden."

	^true!

oneWayBecome: anObject
	"Make all references to the receiver be references to the argument (i.e. anObject replaces all uses of the receiver, and the receiver's identity and contents are lost). This is the  only form of #become: available in some Smalltalk systems. Can follow a two
	way #become: for even more mind boggling fun (to maintain one objects identity, but anothers value).

	Primitive failure reasons:
		ObjectTypeMismatch	- receiver or argument an object with an immediate representation (e.g. a SmallInteger), or either is a 'permanent' objects (nil, true, false, etc).

	This method should be used with care, but is some what less dangerous than #become:, as it does not affect existing users of anObject. Currently the implementation is not as efficient as #become:."

	<primitive: 154>
	^self primitiveFailed: _failureCode!

perform: selector
	"Send the receiver the unary message indicated by the <selector> argument, answering the result. 

	Primitive failure reasons:
		InvalidSelector		- selector is not a Symbol
		WrongNumberOfArgs	- The number of arguments expected with the selector is not zero."

	<primitive: 83>
	^Error
		performFailed: _failureCode
		of: selector
		for: self
		withArgs: {}!

perform: selector with: argument1
	"Send the receiver the keyword message indicated by the arguments, answering the result. 
	The first argument selector is the <selector> of the message. The second <Object> argument,  argument1, is the argument of the message to be sent. 

	Primitive failure reasons:
		InvalidSelector		- selector is not a Symbol
		WrongNumberOfArgs	- The number of arguments expected with the selector is not one."

	<primitive: 83>
	^Error
		performFailed: _failureCode
		of: selector
		for: self
		withArgs: {argument1}!

perform: selector with: argument1 with: argument2
	"Send the receiver the keyword message indicated by the arguments, answering the result. 
	The first argument <selector> is the selector of the message. The other arguments <argument1> and <argument2>, are the argument of the message to be sent.

	Primitive failure reasons:
		InvalidSelector		- selector is not a Symbol
		WrongNumberOfArgs	- The number of arguments expected with the selector is not two."

	<primitive: 83>
	^Error
		performFailed: _failureCode
		of: selector
		for: self
		withArgs: {argument1. argument2}!

perform: selector with: argument1 with: argument2 with: argument3
	"Send the receiver the keyword message indicated by the arguments, answering the result. 
	The first argument selector is the <selector> of the message. The other <Object> arguments argument1, argument2 and argument3 are the arguments of the message to be sent. 

	Primitive failure reasons:
		InvalidSelector		- selector is not a Symbol
		WrongNumberOfArgs	- The number of arguments expected with the selector is not three."

	<primitive: 83>
	^Error
		performFailed: _failureCode
		of: selector
		for: self
		withArgs: {argument1. argument2. argument3}!

perform: selector with: argument1 with: argument2 with: argument3 with: argument4
	"Send the receiver the keyword message indicated by the arguments, answering the result. 
	The first argument selector is the <selector> of the message. The other <Object> arguments argument1, argument2, argument3, and argument4 are the arguments of the message to be sent. 


	Primitive failure reasons:
		InvalidSelector		- selector is not a Symbol
		WrongNumberOfArgs	- The number of arguments expected with the selector is not four."

	<primitive: 83>
	^Error
		performFailed: _failureCode
		of: selector
		for: self
		withArgs: {argument1. argument2. argument3. argument4}!

perform: selector withArguments: arguments
	"Send the receiver the keyword message indicated by the arguments, answering the result. 
	The first argument, selector, is the <selector> of the message. The arguments of the message 
	are the elements of the <Array>, arguments. 

	Primitive failure reasons:
		InvalidParameter1	- selector is not a Symbol
		InvalidParameter2	- arguments is not an Array
		WrongNumberOfArgs	- The number of arguments expected with the selector is not the size of the arguments."

	<primitive: 84>
	^Error
		performFailed: _failureCode
		of: selector
		for: self
		withArgs: arguments!

perform: aSymbol withArgumentsAt: anAddress descriptor: anExternalDescriptor
	"Private - Send message with selector, aSymbol, to anObject,
	with arguments instantiated from memory at anAddress using the 
	the external arguments types from the typinfo in anExternalDescriptor.
	Implementation Note: For performance and consistency (with outbound external calls) 
	reasons, we use a VM supplied primitive to instantiate and push the arguments and 
	perform the message, but there is no reason that this cannot be done in Smalltalk 
	if different argument conversions are required. The standard conversions are the 
	same as those performed for return types by the external call primitive (see
	the ExternalLibrary class).

	Primitive Failure reasons:
		InvalidParameter1	- the selector, aSymbol, is an immediate object (e.g. a SmallInteger).
		InvalidParameter2	- anAddress is not a valid address object (SmallInteger/byte indirection)
		InvalidParameter3	- anExternalDescriptor is invalid."

	<primitive: 114>
	^self primitiveFailed: _failureCode!

postCopy
	"Apply any final flourish to the copy that may be required. This should be overridden by
	subclasses which provide their own storage (i.e. in instance variable(s)) for
	events/dependents in order to release those (otherwise the copy will inherit them).

	This selector should have an underscore prefix to avoid the fragile base class problem in
	this ANSI standard class which must be subclassable by compliant programs."

	^self!

primitiveFailed: anInteger
	"Generate an error to the effect that a primitive has failed, including the failure code specified by the primitive."

	^HRESULTError signal: 'Primitive failed' withFailureCode: anInteger!

printOn: aStream
	"Append, to the <puttableStream>, aStream, a string whose characters are a
	the same as those which would result from sending a #printString
	message to the receiver.
	N.B. This is really intended for development use. #displayOn: and #displayString
	are complementary methods for generating strings for presentation to an
	end-user."

	| name |
	name := self class name.
	aStream
		nextPutAll: (name first isVowel ifTrue: ['an '] ifFalse: ['a ']);
		nextPutAll: name!

printString
	"Answer a <readableString> whose characters are a description of the receiver 
	as a developer would want to see it."

	| stream |
	stream := String writeStream: 32.
	self printOn: stream.
	^stream contents!

propertyAt: aSymbol
	"Answers a property value of the receiver whose name matches aSymbol."

	^self propertyManager propertyOf: self at: aSymbol.!

propertyAt: aSymbol ifAbsent: aBlock
	"Answers a property value of the receiver whose name matches aSymbol. If the object
	does not have such a property then aBlock is evaluated."

	^self propertyManager propertyOf: self at: aSymbol ifAbsent: aBlock.!

propertyAt: aSymbol put: valueObject
	"Sets a property value of the receiver whose name matches aSymbol."

	^self propertyManager propertyOf: self at: aSymbol put: valueObject.!

propertyManager
	"Private - Answers the default PropertyManager to use."

	^_PropertyRegister!

refersToLiteral: anObject
	"Private - Answer whether the receiver is a reference to the literal argument.
	This assumes that the receiver is in the role of a literal."

	^self class == anObject class and: [self = anObject]!

release
	"Remove references to objects that may refer back to the receiver. Note that although 
	we remove references to objects that depend on the receiver or receive triggers from it; 
	we don't perform the opposite removal. This means that an object is responsible for 
	deregistering these explictly."

	self breakDependents.
	self removeAllEventsTriggered!

removeAllEventsTriggered
	"Remove all events triggers by the receiver"

	self setEvents: nil!

removeAllProperties
	"Remove all the properties of the receiver."
	
	self propertyManager removeAllPropertiesOf: self!

removeDependent: anObject
	"Remove the argument, anObject, as one of the receiver's dependents. If anObject is not 
	a dependent, do nothing. Answer anObject."

	| dependents |
	(dependents := self getDependents) isNil
		ifFalse: [
			dependents
				remove: anObject ifAbsent: [];
				isEmpty ifTrue: [self setDependents: nil]].
	^anObject!

removeEventsTriggeredFor: anObject
	"Removes all events of the receiver destined for anObject."

	| events |
	(events := self getEvents) notNil ifTrue: [ 
		self setEvents: (events removeEventsTriggeredFor: anObject)]!

removePropertyAt: aSymbol
	"Removes a property of the receiver whose name matches aSymbol."

	^self propertyManager removePropertyOf: self at: aSymbol!

removePropertyAt: aSymbol ifAbsent: aBlock
	"Removes a property of the receiver whose name matches aSymbol. If the object
	does not have such a property then aBlock is evaluated."

	^self propertyManager removePropertyOf: self at: aSymbol ifAbsent: aBlock.!

resize: anInteger
	"Resize the receiver to accomodate anInteger indexable instance variables. If anInteger 
	is greater than the current size of the receiver, then new, safely initialized, elements are 
	added to the end of the receiver. If anInteger is less that the current size of the receiver, 
	then elements are removed from the end of the receiver.

	This is one of the relatively rare Dolphin methods that 'internally' modifies its receiver, 
	not a copy of it, so all objects referencing the receiver will see the change - i.e. it has 
	potential side effects.

	Note also that this implementation is too simple for many objects (e.g. Sets) which will need
	to override it.

	Primitive failure reason:
		InvalidParameter1	- anInteger is not a positive SmallInteger
		ObjectTypeMismatch	- the receiver is not of an indexable (variable sized) class.
		AccessViolation		- the receiver is immutable."

	<primitive: 101>
	| answer |
	self isImmutable ifTrue: [Processor constWriteSignal signalWith: self].
	answer := self class new: anInteger.
	1 to: anInteger do: [:i | answer at: i put: (self at: i)].
	self become: answer!

respondsTo: selector
	"Answer whether the receiver has behaviour defined for the <selector> argument. 
	N.B. Even if an object is able to respond to selector, an error may still result 
	when that selector is sent if, for example, the receiver implements the message with
	#subclassReponsibility."

	^self class canUnderstand: selector!

setDependents: aDependentsCollectionOrNil
	"Private - Set the DependentsCollection of the receiver to be aDependentsCollectionOrNil.
	Answer the receiver."

	aDependentsCollectionOrNil isNil
		ifTrue: [_DependentsRegister removeKey: self ifAbsent: []]
		ifFalse: [_DependentsRegister at: self put: aDependentsCollectionOrNil]!

setEvents: anEventsCollectionOrNil 
	"Private - Set the EventsCollection of the receiver to be anEventsCollectionOrNil.
	Answer the receiver."

	(anEventsCollectionOrNil isNil or: [anEventsCollectionOrNil isEmpty]) 
		ifTrue: [_EventsRegister removeKey: self ifAbsent: []]
		ifFalse: [_EventsRegister at: self put: anEventsCollectionOrNil]!

setSpecialBehavior: anInteger
	"Private - Set the special behavior bits of the receiver according to the low order word of
	the argument, anInteger. The high order byte of that word specifies the AND (or 'keep')
	mask, used to specify what bits to leave as they are, and the low order byte of that word
	specifies the OR (or 'add') mask, used to specify what bits to set. To query the current
	value, use the mask 16rFF00."

	"Note: Using this operations requires knowledge and care to avoid corrupting object state."

	"Primitive failure reasons: 
		InvalidParameter1 	- anInteger is not a SmallInteger 
		ObjectTypeMismatch	- the receiver is an immediate object."

	<primitive: 69>
	^self primitiveFailed: _failureCode!

shallowCopy
	"Answer a copy of the receiver which shares the receiver's instance 
	variables. This implementation suffices for most objects. The
	primitive does not fail, but #basicShallowCopy provides a Smalltalk
	implementation for documentation purposes."

	<primitive: 155>
	^self basicShallowCopy!

shouldNotImplement
	"The class of the receiver is unable to provide an implementation of a message in 
	the protocol of one of its superclasses. Generate an exception to this effect.

	This error will be experienced when an attempt is made to use inappropriate
	superclass protocol against a subclass which is not a true sub-type (e.g.
	SortedCollection is not a true sub-type of OrderedCollection, as it does
	not support the indexed access method #at:put:."

	| method |
	method := Processor activeProcess topFrame sender method.
	^self
		error: ('<1p> should not implement <2p>' expandMacrosWithArguments: {self class. method selector})!

size
	"Answer the number of indexed variables in the receiver (0 for non-indexable objects,
	as the named instance variables are not included). The primitive should not fail."

	<primitive: 62>
	^self primitiveFailed: _failureCode!

species
	"Answer the preferred class of the receiver - not always the same as the
	answer to #class (although this implementation uses the class primitive, which
	should not fail). Used, for example, by Collections to determine what type of Collection
	should result from the enumeration messages #collect:, #select:, and #reject:"

	<primitive: 111>
	^self primitiveFailed: _failureCode!

stbFixup: anSTBInFiler at: newObjectIndex
	"Answer the true object that must be used to represent the receiver when read from anSTBInFiler.
	Typically this is overridden by subclasses of STBProxy to answer the proxied object. Other classes
	may also override this method to effectively 'one way become' the receiver to some other object"

	^self!

stbSaveOn: anSTBOutFiler
	"Save out a binary representation of the receiver to anSTBOutFiler.
	The options are:
	1.	to let the filer output the receiver as normal using
			STBOutFiler>>#saveObject: self.
				or
			STBOutFiler>>#saveObject: self as: 0.

	2.	to output nil instead of the receiver using
			STBOutFiler>>#saveObject: self as: nil.

	3.	to output a proxy in place of the receiver using
			STBOutFiler>>#saveObject: self as: anSTBProxy.
		The proxy will be sent a #fixup:at: message at load time (see STB classes) and should then
		answer the object it represents.

	By default, objects are happy to be saved and loaded just as they are (option 1)."

	anSTBOutFiler saveObject: self!

storeOn: aStream
	"Append to the <puttableStream> argument, target, an expression which when 
	evaluated will answer a collection similar to the receiver."

	self printOn: aStream!

storeString
	"Answer a <readableString> which, when compiled and evaluated, results in
	an object similar to the receiver."

	| stream |
	stream := String writeStream: 32.
	self storeOn: stream.
	^stream contents!

subclassResponsibility
	"Generate an error to the effect that a message was receiver which should have been 
	implemented by a subclass. Useful for completely defining abstract classes.

	This error will be experienced when either, an abstract class has been incorrectly instantiated, or
	a subclass of an abstract class is not completely defined."

	| method |
	method := Processor activeProcess topFrame sender method.
	^Error subclassResponsibility: method selector!

swappingBecome: anObject
	"Swap the instance pointers of the receiver and the argument, anObject. All variables 
	in the entire system that pointed to the receiver will now point to the argument, and 
	vice versa. A synonym for #become:. To better allow for code portablity you should
	use #swappingBecome: and #oneWayBecome: rather than #become:. They are more
	explicit since the behaviour of the latter is not standard across all Smalltalk
	implementations."

	<primitive: 72>
	^self primitiveFailed: _failureCode!

trigger: anEventSymbol
	"Evaluate the sequence of MessageSends registered for the receiver and the event, 
	anEventSymbol. Also signal a change for any dependents with the 
	trigger name as the aspect. Answer the result returned by the last respondent (for :-})."

	^self events triggerEvent: anEventSymbol!

trigger: anEventSymbol with: aParameter
	"Evaluate the sequence of MessageSends registered for the receiver and the event, 
	anEventSymbol. Passes aParameter along to each MessageSend. Also signal a change for 
	any dependents with the trigger name as the aspect. Answer the value returned
	by the last respondent."

	^self events triggerEvent: anEventSymbol with: aParameter.
!

trigger: anEventSymbol with: aParameter with: anotherParameter
	"Evaluate the sequence of MessageSends registered for the receiver and the event, 
	anEventSymbol. Passes aParameter and anotherParameter along to each MessageSend. 
	Also signal a change for any dependents with the trigger name as the aspect.
	Answer the value returned by the last respondent."

	^self events triggerEvent: anEventSymbol with: aParameter with: anotherParameter.
!

trigger: anEventSymbol withArguments: args
	"Evaluate the sequence of MessageSends registered for the receiver and the event, 
	anEventSymbol. Passes the array of parameters to each message send.
	Answer the value returned by the last respondent."

	^self events triggerEvent: anEventSymbol withArguments: args!

understandsArithmetic
	"Answer whether the receiver understands basic arithmetic (and can therefore
	be operated on like Numbers)."

	^false
!

update: aParameter
	"An object on whom the receiver is dependent has chnanged. The receiver updates its 
	status accordingly. The argument is the argument to the #changed: message. 
	The default is to do nothing."

	^self
!

update: anAspect with: argument
	"An object on whom the receiver is dependent has changed. The receiver updates its 
	status accordingly. anAspect usually identifies the kind of change, and argument gives 
	additional information.	The default is to try the simpler #update: method dropping 
	the argument."

	self update: anAspect!

update: anAspect with: argument from: originator
	"An object on whom the receiver is dependent has changed. The receiver updates its 
	status accordingly. anAspect usually identifies the kind of change, and argument gives 
	additional information. The object that triggered this update was originator.
	The default is to try the simpler #update:with: method dropping the originator."

	self update: anAspect with: argument.!

when: aSymbol perform: aValuable 
	"Private - Adds aValuable to the event list for the event named by aSymbol in the receiver.
	N.B. Do not use this to register blocks as event handlers as you will not be able to
	unregister them and they will remain registered, creating a memory leak. Instead use code of
	the following form: 
		handler := [:arg1 | ...].
		eventSource when: #myEvent: send: #value: to: handler.
		...
		eventSource trigger: #myEvent: with: 123.	""handler Block is evaluated with 123""
		...
		eventSource removeEventsTriggeredFor: handler.
	"

	self getEvents 
		ifNil: 
			[| events |
			events := EventsCollection new.
			events addEvent: aSymbol action: aValuable.
			self setEvents: events]
		ifNotNil: [:events | events addEvent: aSymbol action: aValuable]!

when: anEventSymbol send: aSelector to: anObject
	"Register an event handler such that when the receiver triggers the event
	anEventSymbol, the unary selector, aSelector, is sent to anObject."

	self when: anEventSymbol
		perform: (EventMessageSend receiver: anObject selector: aSelector)!

when: anEventSymbol send: aSelector to: anObject with: anArgument
	"Register an event handler such that when the receiver triggers the event
	anEventSymbol, the keyword selector, aSelector, is sent to anObject with the
	single argument, anArgument."

	self when: anEventSymbol
		perform: (EventMessageSend 
				receiver: anObject
				selector: aSelector
				argument: anArgument)!

when: anEventSymbol send: aSelector to: anObject withArguments: anArray
	"Register an event handler such that when the receiver triggers the event
	anEventSymbol, the multi-keyword selector aSelector is sent to anObject with arguments 
	from anArray."

	self when: anEventSymbol
		perform: (EventMessageSend 
				receiver: anObject
				selector: aSelector
				arguments: anArray)!

when: anEventSymbol sendTo: anObject
	"Register an event handler such that when the receiver triggers the event
	anEventSymbol, it is sent as a unary selector to anObject."

	self 
		when: anEventSymbol
		send: anEventSymbol
		to: anObject!

whileMutableDo: aNiladicBlock 
	"Evaluate and answer the result of the <niladicBlock> argument while the receiver is 
	temporarily made mutable."

	^self isImmutable 
		ifTrue: 
			[self isImmutable: false.
			aNiladicBlock ensure: [self isImmutable: true]]
		ifFalse: [aNiladicBlock value]!

yourAddress
	"Answer the address of the body of the receiver. The primitive does not fail.

	The answer (an Integer) can be passed to external procedures as a pointer
	or stored into another byte object representing a structure as a member pointer,
	and call also be mutated (using #becomeA(n):) into a byte object such as ExternalAddress.

	Although the primitive does not fail for non-byte objects, it is potentially unsafe
	to access these indirectly, almost certainly an error to pass their address to
	external procedures, and very likely to cause unexpected behaviour if used to modify
	the contents of the object.

	When taking the address of an object, you are entering the unprotected realms 
	of pointer manipulation, and need to be aware of object lifetime issues. In particular
	be careful not to pass the address of a temporary object to a third party which is
	intending to keep hold of that address, as the address will become invalid if the
	object is garbage collected. In addition, if the third party writes off the front or end
	of the object, it may corrupt the Smalltalk image, and cause unexpected behavior.
	It is often better to use an external buffer, outside the Smalltalk object space, and
	manage its lifetime yourself."

	<primitive: 103>
	^self primitiveFailed: _failureCode!

yourself
	"Answer the receiver (useful for returning the receiver from a cascaded message)."

	^self
! !
!Object categoriesForMethods!
??!converting!public! !
_deepCopy:!copying!private! !
_deepenShallowCopy:trail:!copying!private! !
_primitiveError:at:!exceptions!private! !
_primitiveError:at:put:!exceptions!private! !
~~!comparing!public! !
~=!comparing!public! !
=!comparing!public! !
==!comparing!public! !
->!converting!public! !
addDependent:!dependency!public! !
allReferences!enumerating!public! !
allReferences:!enumerating!public! !
appendToStream:!double dispatch!private! !
asParameter!converting!public! !
assert:!public!testing! !
asUIntPtr!converting!public! !
at:!accessing!public! !
at:put:!accessing!public! !
basicAt:!accessing!private! !
basicAt:put:!accessing!private! !
basicClass!accessing!public! !
basicDoesNotUnderstand:!exceptions!public! !
basicIdentityHash!comparing!public! !
basicIdentityIndexOf:from:to:!private!searching! !
basicPrintOn:!printing!public! !
basicPrintString!printing!public! !
basicResize:!mutating!private! !
basicShallowCopy!copying!private! !
basicSize!accessing!private! !
basicYourAddress!accessing!private! !
become:!mutating!public! !
becomeA:!mutating!public! !
becomeAn:!mutating!public! !
beFinalizable!accessing!public! !
beStrong!accessing!public! !
beUnfinalizable!accessing!public! !
beWeak!accessing!public! !
binaryStoreBytes!binary filing!public! !
binaryStoreOn:!binary filing!public! !
breakDependents!dependency!public! !
broadcast:!dependency!public! !
broadcast:with:!dependency!public! !
changed!dependency!public! !
changed:!dependency!public! !
changed:with:!dependency!public! !
class!accessing!public! !
copy!copying!public! !
deepCopy!copying!public! !
dependents!dependency!public! !
displayOn:!displaying!public! !
displayString!displaying!public! !
doesNotUnderstand:!exceptions!public!vm entry points! !
error:!exceptions!public! !
errorCantHold:!exceptions!public! !
errorNotFound:!exceptions!public! !
errorSubscriptBounds:!exceptions!public! !
events!debugger-step over!events!public! !
expandMacrosIn:!double dispatch!private! !
finalize!finalizing!public! !
free!finalizing!public! !
getDependents!dependency!private! !
getEvents!events!private! !
getSpecialBehavior!accessing!private! !
hash!comparing!public! !
identityHash!comparing!public! !
ifNil:!control flow!public! !
ifNil:ifNotNil:!control flow!public! !
ifNotNil:!control flow!public! !
ifNotNil:ifNil:!control flow!public! !
initialize!initializing!public! !
instVarAt:!accessing!private! !
instVarAt:put:!accessing!private! !
instVarNamed:!accessing!private! !
isAtomic!public!testing! !
isCharacter!public!testing! !
isFinalizable!public!testing! !
isImmediate!private!testing! !
isImmutable!public!testing! !
isImmutable:!initializing!public! !
isIndexable!public!testing! !
isInteger!public!testing! !
isKindOf:!public!testing! !
isLiteral!public!testing! !
isMemberOf:!public!testing! !
isNil!public!testing! !
isNumber!public!testing! !
isString!public!testing! !
isSymbol!public!RefactoringBrowser! !
isWeak!public!testing! !
mustBeBoolean!exceptions!not restartable!private!vm entry points! !
noEventsDo:!debugger-step through!events!public! !
notNil!public!testing! !
oneWayBecome:!mutating!public! !
perform:!message sending!public! !
perform:with:!message sending!public! !
perform:with:with:!message sending!public! !
perform:with:with:with:!message sending!public! !
perform:with:with:with:with:!message sending!public! !
perform:withArguments:!message sending!public! !
perform:withArgumentsAt:descriptor:!message sending!private! !
postCopy!copying!public! !
primitiveFailed:!exceptions!public! !
printOn:!printing!public! !
printString!printing!public! !
propertyAt:!properties!public! !
propertyAt:ifAbsent:!properties!public! !
propertyAt:put:!properties!public! !
propertyManager!private!properties! !
refersToLiteral:!private!testing! !
release!dependency!public! !
removeAllEventsTriggered!events!public! !
removeAllProperties!properties!public! !
removeDependent:!dependency!public! !
removeEventsTriggeredFor:!events!public! !
removePropertyAt:!properties!public! !
removePropertyAt:ifAbsent:!properties!public! !
resize:!mutating!public! !
respondsTo:!public!testing! !
setDependents:!dependency!private! !
setEvents:!events!private! !
setSpecialBehavior:!accessing!private! !
shallowCopy!copying!public! !
shouldNotImplement!exceptions!public! !
size!accessing!public! !
species!accessing!public! !
stbFixup:at:!binary filing!public! !
stbSaveOn:!binary filing!public! !
storeOn:!printing!public! !
storeString!printing!public! !
subclassResponsibility!exceptions!public! !
swappingBecome:!mutating!public! !
trigger:!debugger-step through!events!public! !
trigger:with:!debugger-step through!events!public! !
trigger:with:with:!debugger-step through!events!public! !
trigger:withArguments:!debugger-step through!events!public! !
understandsArithmetic!public!testing! !
update:!dependency!public! !
update:with:!dependency!public! !
update:with:from:!dependency!public! !
when:perform:!events!private! !
when:send:to:!events!public! !
when:send:to:with:!events!public! !
when:send:to:withArguments:!events!public! !
when:sendTo:!events!public! !
whileMutableDo:!accessing!public! !
yourAddress!accessing!public! !
yourself!accessing!public! !
!

Object methodProtocol: #Object attributes: #(#ansi #readOnly) selectors: #(#~~ #~= #= #== #class #copy #doesNotUnderstand: #error: #hash #identityHash #isKindOf: #isMemberOf: #isNil #notNil #perform: #perform:with: #perform:with:with: #perform:with:with:with: #perform:withArguments: #printOn: #printString #respondsTo: #yourself)!

!Object class methodsFor!

binaryReadFrom: aStream
	"Answers an object read from its binary representation on aStream.
	This must have been saved using Object>>binaryStoreOn:"

	^self binaryReadFrom: aStream context: nil

!

binaryReadFrom: aStream context: anObject
	"Answers an object read from its binary representation on aStream.
	This must have been saved using Object>>binaryStoreOn:"

	^(STBInFiler on: aStream) context: anObject; next.!

fromBinaryStoreBytes: aByteArray
	"Answers an object read from its binary representation in aByteArray.
	This must have been created using Object>>binaryStoreBytes"

	| stream |
	stream := aByteArray readStream.
	^self binaryReadFrom: stream.


!

fromBinaryStoreBytes: aByteArray context: anObject
	"Answers an object read from its binary representation in aByteArray.
	This must have been created using Object>>binaryStoreBytes"

	| stream |
	stream := aByteArray readStream.
	^self binaryReadFrom: stream context: anObject


!

initialize
	"Initialise the receiver's class variables

	_PropertyRegister	-	Register of properties (instance specific information not stored
						in instance variables) of objects
	_AlreadyPrinted		-	Set of objects used to detect recursive printing (which would
						otherwise cause a stack overflow).
	_AssertionFailureSignal-	Signalled on #assert: argument evaluting to false."

	self
		initializeDependencyMechanism;
		initializePropertyRegister;
		initializeEventsRegister.
	_AssertionFailureSignal isNil
		ifTrue: [_AssertionFailureSignal := Signal resumableDescription: 'assertion failure']!

initializeDependencyMechanism
	"Private - Initialize the dependency register provided for all objects which do not have their own dependency register."

	_DependentsRegister
		ifNil: [_DependentsRegister := WeakIdentityDictionary newWithWeakKeys: 2]
		ifNotNil: 
			[:register |
			register
				haveWeakKeys;
				haveStrongValues]!

initializeEventsRegister
	"Private - Initialize the events register provided for all objects which don't override #getEvents and #setEvents:."

	_EventsRegister
		ifNil: [_EventsRegister := WeakIdentityDictionary newWithWeakKeys: 2]
		ifNotNil: 
			[:register |
			register
				haveWeakKeys;
				haveStrongValues]!

initializePropertyRegister
	"Private - Initialize the property register provided for all objects."

	_PropertyRegister
		ifNil: [_PropertyRegister := PropertyManager new]
		ifNotNil: 
			[:properties |
			properties register
				haveWeakKeys;
				haveStrongValues]!

resourcesLocator
	"Answer a default file locator that can be used to locate resource files for this class.
	In a development environment it is assumed that resources will be relative to the package directory for the class. In a runtime
	environment it is assumed that all resources will be in a Resources subdirectory relative to the installation directory"

	^SessionManager current resourcesLocatorForClass: self! !
!Object class categoriesForMethods!
binaryReadFrom:!binary filing!public! !
binaryReadFrom:context:!binary filing!public! !
fromBinaryStoreBytes:!binary filing!public! !
fromBinaryStoreBytes:context:!binary filing!public! !
initialize!development!initializing!public! !
initializeDependencyMechanism!initializing!private! !
initializeEventsRegister!initializing!private! !
initializePropertyRegister!initializing!private! !
resourcesLocator!public! !
!

Empresa guid: (GUID fromString: '{61730288-6220-453a-be21-37c6359033e2}')!
Empresa comment: ''!
!Empresa categoriesForClass!Kernel-Objects! !
!Empresa methodsFor!

altaUsuario
"cosas varias que hacen altas a los usuarios"!

nombre
	^nombre!

nombre: anObject
	nombre := anObject!

ultraMetodo
"esto va a ser muy bueno cuando lo haya hecho"! !
!Empresa categoriesForMethods!
altaUsuario!public! !
nombre!accessing!private! !
nombre:!accessing!private! !
ultraMetodo!public! !
!

Reserva guid: (GUID fromString: '{ad159c3f-1363-4554-894d-3c530b420b9b}')!
Reserva comment: ''!
!Reserva categoriesForClass!Kernel-Objects! !
Ruta guid: (GUID fromString: '{8ebbefc3-379f-48ec-8cc4-9af2b938d69d}')!
Ruta comment: ''!
!Ruta categoriesForClass!Kernel-Objects! !
Usuario guid: (GUID fromString: '{f6a55ce8-775f-4522-85f9-73edb18732b2}')!
Usuario comment: ''!
!Usuario categoriesForClass!Kernel-Objects! !
!Usuario methodsFor!

apellido
	^apellido!

apellido: anObject
	apellido := anObject!

dni
	^dni!

dni: anObject
	dni := anObject!

nombre
	^nombre!

nombre: anObject
	nombre := anObject! !
!Usuario categoriesForMethods!
apellido!accessing!private! !
apellido:!accessing!private! !
dni!accessing!private! !
dni:!accessing!private! !
nombre!accessing!private! !
nombre:!accessing!private! !
!

Vehiculo guid: (GUID fromString: '{8f671e3b-01fa-4b58-8271-47c823690ab9}')!
Vehiculo comment: ''!
!Vehiculo categoriesForClass!Kernel-Objects! !
Estandar guid: (GUID fromString: '{c6b82d80-c790-431b-a723-7397cab066b9}')!
Estandar comment: ''!
!Estandar categoriesForClass!Kernel-Objects! !
Lujo guid: (GUID fromString: '{7df604f4-7cb3-4e4f-b8d5-bcd8d6fd079d}')!
Lujo comment: ''!
!Lujo categoriesForClass!Kernel-Objects! !
"Binary Globals"!

