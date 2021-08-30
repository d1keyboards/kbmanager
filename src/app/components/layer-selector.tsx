import React from 'react'
import { times } from 'lodash'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const LAYER_SPACING = 20
const LAYER_HEIGHT = 40
const LAYER_WIDTH = 60

const LayerButton = styled.div<{ layer: number }>(
	props => css`
		border: 2px solid black;
		background-color: white;
		border-radius: 4px;
		transform: skew(-30deg);
		opacity: 0.9;
		width: ${LAYER_WIDTH}px;
		height: ${LAYER_HEIGHT}px;
		margin: 0 10px;
		position: absolute;
		left: 0;
		cursor: pointer;
		transition: var(--transition-button);
		:before {
			content: '${props.layer}';
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 20px;
		}
		:hover {
			transform: skew(-30deg) translateY(20%);
		}
	`
)
const SelectorContainer = styled.div`
	position: relative;
	width: ${LAYER_WIDTH + 20}px;
`

const LAYER_COLORS = ['--color-1', '--color-2', '--color-3', '--color-4']

type Props = {
	layers: number
	selected: number
}
export const LayerSelector: React.FC<Props> = ({ selected, layers }) => (
	<SelectorContainer
		style={{ height: LAYER_SPACING * (layers - 1) + LAYER_HEIGHT }}
	>
		{times(layers, layer => {
			const colorStyle = LAYER_COLORS[layer % LAYER_COLORS.length]
			return (
				<LayerButton
					key={layer}
					style={{
						bottom: `${layer * LAYER_SPACING}px`,
						borderColor: `var(${colorStyle})`,
						color: `var(${colorStyle})`,
					}}
					layer={layer + 1}
				/>
			)
		})}
	</SelectorContainer>
)

export default LayerSelector
