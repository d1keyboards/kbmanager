import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const KEY_SIZE = 55

const KeyCap = styled.div(
	(props: { w: number; h: number; unfocused?: boolean }) => css`
		width: ${KEY_SIZE * props.w}px;
		height: ${KEY_SIZE * props.h}px;
		border: 1px solid #aaa;
		border-radius: 4px;
		background-color: #ccc;
		position: relative;
		cursor: pointer;
		opacity: ${props.unfocused ? 0.4 : 1};
		transition: 0.2s ease-out;
		:after {
			content: '';
			display: block;
			background-color: white;
			position: absolute;
			top: 2px;
			left: 4px;
			bottom: 8px;
			right: 5px;
			border-radius: 4px;
		}
		&:hover {
			border: 2px solid var(--color-accent);
			transform: scale(1.2);
			z-index: 9;
		}
	`
)
const KeyLegend = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	vertical-align: middle;
`

type Props = {
	onClick: () => void
	unfocused?: boolean
	label?: string
	w?: number
	h?: number
}
export const Key: React.FC<Props> = ({ label, w, h, unfocused, onClick }) => (
	<KeyCap w={w || 1} h={h || 1} unfocused={unfocused} onClick={onClick}>
		<KeyLegend>{label}</KeyLegend>
	</KeyCap>
)

export default Key
