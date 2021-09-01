import React from 'react'
import styled from '@emotion/styled'
import { KeyDescriptor } from '~/models'
import Key, { KEY_SIZE } from './key'

const GridContainer = styled.div`
	position: relative;
`
const KeyLocation = styled.div`
	position: absolute;
`

type Props<T extends KeyDescriptor> = {
	onKeySelect?: (key: T) => void
	selected?: T | null
	layout: T[]
	keyboard: {
		width: number
		height: number
	}
}

export function KeyGrid<T extends KeyDescriptor>({
	layout,
	keyboard,
	onKeySelect,
	selected,
}: Props<T>): JSX.Element {
	const { width, height } = keyboard

	return (
		<GridContainer
			style={{
				width: `${KEY_SIZE * width}px`,
				height: `${KEY_SIZE * height}px`,
			}}
		>
			{layout.map(key => (
				//This is how keyboard layout manager renders stuff, sorry
				<div
					key={`${key.gridX}-${key.gridY}`}
					style={{
						position: 'absolute',
						transform: key.rotation ? `rotate(${key.rotation}deg)` : undefined,
						transformOrigin: key.rotationOrigin
							? `${key.rotationOrigin.x * KEY_SIZE}px ${
									key.rotationOrigin.y * KEY_SIZE
							  }px`
							: undefined,
					}}
				>
					<KeyLocation
						style={{
							top: `${KEY_SIZE * key.y}px`,
							left: `${KEY_SIZE * key.x}px`,
						}}
					>
						<Key
							label={key.label}
							unfocused={!!selected && selected !== key}
							w={key.width}
							h={key.height}
							color={key.color}
							onClick={() => onKeySelect?.(key)}
						/>
					</KeyLocation>
				</div>
			))}
		</GridContainer>
	)
}

export default KeyGrid
