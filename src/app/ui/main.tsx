import React, { useState } from 'react'

export const Main: React.FC = () => {
	const [data, setData] = useState()
	return (
		<div>
			<button
				onClick={() => {
					// In renderer process (web page).
					setData((window as any).electron.hid.listDevices())
				}}
			>
				GO!
			</button>
			<div>DATA: {JSON.stringify(data)}</div>
		</div>
	)
}

export default Main
