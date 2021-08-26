import React from 'react'
import styled from '@emotion/styled'
import KeyGrid from '~/components/key-grid'
import LayerSelector from '~/components/layer-selector'

import crkbd from '~/../keyboards/crkbd/info.json'

const Container = styled.div`
	display: flex;
	flex-direction: row;
`

const LayerSelectorPane = styled.div`
	display: flex;
	align-items: center;
	padding: 20px 40px;
`

const KeyGridPane = styled.div`
	display: flex;
	flex: 1;
	padding: 20px 0 20px 20px;
	justify-content: center;
	align-items: center;
`

export const KeymapLayout: React.FC = () => {
	return (
		<Container>
			<KeyGridPane>
				<KeyGrid
					descriptor={{
						...crkbd.layouts.LAYOUT_split_3x6_3,
						width: crkbd.width,
						height: crkbd.height,
					}}
				/>
			</KeyGridPane>
			<LayerSelectorPane>
				<LayerSelector layers={4} selected={0} />
			</LayerSelectorPane>
		</Container>
	)
}
export default KeymapLayout
