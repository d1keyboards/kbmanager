import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 10px;
	box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.2);
`

const MenuItem = styled(NavLink)`
	color: var(--color-3);
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weignt: normal;
	position: relative;
	border: 1px solid var(--color-accent);
	background-color: white;
	width: 60px;
	height: 60px;
	border-radius: 8px;
	margin: 10px;
	transition: var(--transition-button);
	cursor: pointer;
	:hover {
		transform: scale(1.1);
	}

	&.active:after {
		content: ' ';
		background-color: var(--color-accent);
		position: absolute;
		bottom: 2px;
		width: 20px;
		height: 4px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 2px;
	}
`

export const MainMenu: React.FC = () => (
	<Menu>
		<MenuItem to="/keymap">Keymap</MenuItem>
		<MenuItem to="/test">Test</MenuItem>
		<MenuItem to="/options">Options</MenuItem>
		<MenuItem to="/settings">Settings</MenuItem>
	</Menu>
)

export default MainMenu
