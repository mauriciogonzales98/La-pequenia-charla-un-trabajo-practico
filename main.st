miEmpresa := Empresa new.
miEmpresa init.

op := 0.

[ op = ($4 ) ] whileFalse: [
op := (miEmpresa menu).
(op == $1) ifTrue: [ MessageBox notify: 'nice' ].
MessageBox notify: op.
]
