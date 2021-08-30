import React from 'react'
import styled from '@emotion/styled'
import { KeyDescriptor, KeyboardDescriptor } from '~/models'
import KeyGrid from '~/components/key-grid'
import LayerSelector from '~/components/layer-selector'

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
type Props = {
	keyboard: KeyboardDescriptor
	onKeySelect: (key: KeyDescriptor) => void
	selected?: KeyDescriptor | null
}
export const KeyboardLayout: React.FC<Props> = ({
	keyboard,
	onKeySelect,
	selected,
}) => (
	<Container>
		<KeyGridPane>
			<KeyGrid
				keyboard={keyboard}
				layout={keyboard.layout}
				onKeySelect={onKeySelect}
				selected={selected}
			/>
		</KeyGridPane>
		<LayerSelectorPane>
			<LayerSelector layers={4} selected={0} />
		</LayerSelectorPane>
	</Container>
)

export default KeyboardLayout
