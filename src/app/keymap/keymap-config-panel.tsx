import { Switch, Route } from 'react-router-dom'
import * as KeySource from './key-source'

type KeySpec = {
	// code: string
	label?: string
}
type Props = {
	onKeySelect: (key: KeySpec) => void
}
export const KeymapConfigPanel: React.FC<Props> = ({ onKeySelect }) => {
	return (
		<Switch>
			<Route
				path="/keyboard/:id/media"
				render={() => <KeySource.NumpadKeySource onKeySelect={onKeySelect} />}
			/>
			<Route
				path="/keyboard/:id/quantum"
				render={() => <KeySource.TKLKeySource onKeySelect={onKeySelect} />}
			/>
			<Route path="/keyboard/:id/settings" render={() => <div>Settings</div>} />
			<Route
				render={() => <KeySource.TKLKeySource onKeySelect={onKeySelect} />}
			/>
		</Switch>
	)
}

export default KeymapConfigPanel
