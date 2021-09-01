import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { KeymapEditor } from '~/keymap'

const MainContainer = styled.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
`

const ContentContainer = styled.div`
	flex: 1;
`

export const Main: React.FC = () => {
	const [data, setData] = useState()
	return (
		<MainContainer>
			<ContentContainer>
				<Switch>
					<Route path="/" component={KeymapEditor} />
					<Route path="/keyboard" component={KeymapEditor} />
				</Switch>
			</ContentContainer>
		</MainContainer>
	)
}

export default Main
