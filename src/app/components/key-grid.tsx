import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import Key, { KEY_SIZE } from './key'

type KeyDescriptor = {
	label: string
	x: number
	y: number
	w?: number
	h?: number
}

type KeyboardDescriptor = {
	layout: KeyDescriptor[]
	width: number
	height: number
}

const GridContainer = styled.div`
	position: relative;
`
const KeyLocation = styled.div`
	position: absolute;
`

type Props = {
	descriptor: KeyboardDescriptor
}
export const KeyGrid: React.FC<Props> = ({ descriptor }) => {
	const { layout, width, height } = descriptor
	const [selected, setSelected] = useState<KeyDescriptor>()
	const toggleFocus = useCallback(
		(key: KeyDescriptor) => {
			if (selected === key) {
				setSelected(undefined)
			} else {
				setSelected(key)
			}
		},
		[selected]
	)

	return (
		<GridContainer
			style={{
				width: `${KEY_SIZE * width}px`,
				height: `${KEY_SIZE * height}px`,
			}}
		>
			{layout.map(key => (
				<KeyLocation
					key={key.label + '=' + key.x + ':' + key.y}
					style={{
						top: `${KEY_SIZE * key.y}px`,
						left: `${KEY_SIZE * key.x}px`,
					}}
				>
					<Key
						label={key.label}
						unfocused={selected && selected !== key}
						w={key.w}
						h={key.h}
						onClick={() => toggleFocus(key)}
					/>
				</KeyLocation>
			))}
		</GridContainer>
	)
}

export default KeyGrid
