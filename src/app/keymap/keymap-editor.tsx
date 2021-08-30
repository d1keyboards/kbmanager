import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { KeyDescriptor } from '~/models'
import KeyboardLayout from './keyboard-layout'
import { KeymapPanelPicker } from './keymap-panel-picker'
import { KeymapConfigPanel } from './keymap-config-panel'
import * as viaAdapter from '~/keyboards/via-adapter'
import crkbd from '~/../keyboards/crkbd.json'

const keyboard = viaAdapter.parse(crkbd)

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const PanelPickerContainer = styled.div`
	margin: 20px 0;
`

export const KeymapEditor: React.FC = () => {
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

	const handleKeySelected = useCallback(() => {
		console.error(`Map key: ${selected?.label}`)
	}, [selected])
	return (
		<Container>
			<KeyboardLayout
				keyboard={keyboard}
				onKeySelect={toggleFocus}
				selected={selected}
			/>
			<PanelPickerContainer>
				<KeymapPanelPicker />
			</PanelPickerContainer>
			<KeymapConfigPanel onKeySelect={handleKeySelected} />
		</Container>
	)
}

export default KeymapEditor
