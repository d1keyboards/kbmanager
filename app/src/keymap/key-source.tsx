import React from 'react'
import KeyGrid from '~/components/key-grid'
import ANSI from './key-sources/ansi.json'
import TKL from './key-sources/tkl.json'
import Numpad from './key-sources/media.json'

type KeyDescriptor = {
	// code: string
	label?: string
}

type Props = {
	onKeySelect: (key: KeyDescriptor) => void
}
export const ANSIKeySource: React.FC<Props> = ({ onKeySelect }) => (
	<KeyGrid keyboard={ANSI} layout={ANSI.layout} onKeySelect={onKeySelect} />
)
export const TKLKeySource: React.FC<Props> = ({ onKeySelect }) => (
	<KeyGrid keyboard={TKL} layout={TKL.layout} onKeySelect={onKeySelect} />
)
export const NumpadKeySource: React.FC<Props> = ({ onKeySelect }) => (
	<KeyGrid keyboard={Numpad} layout={Numpad.layout} onKeySelect={onKeySelect} />
)
