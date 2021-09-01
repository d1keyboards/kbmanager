import styled from '@emotion/styled'
import { FormattedMessage } from 'react-intl'
import { NavLink, useParams } from 'react-router-dom'

const Container = styled.div`
	display: flex;
	justify-content: center;
`

const OptionLink = styled(NavLink)`
	display: block;
	border: 1px solid var(--color-accent);
	border-radius: 8px;
	padding: 4px;
	margin: 0 10px;
	text-decoration: none;
	&.active {
		text-decoration: underline;
	}
`

export const KeymapPanelPicker: React.FC = () => {
	const { id: keyboardId } = useParams<{ id: string }>()

	return (
		<Container>
			<OptionLink to={`/keyboard/${keyboardId}/tkl`}>
				<FormattedMessage id="layout.option.tkl" />
			</OptionLink>
			<OptionLink to={`/keyboard/${keyboardId}/media`}>
				<FormattedMessage id="layout.option.media" />
			</OptionLink>
			<OptionLink to={`/keyboard/${keyboardId}/quantum`}>
				<FormattedMessage id="layout.option.quantum" />
			</OptionLink>
			<OptionLink to={`/keyboard/${keyboardId}/settings`}>
				<FormattedMessage id="layout.option.settings" />
			</OptionLink>
		</Container>
	)
}

export default KeymapPanelPicker
