import React, { useState } from 'react'
import KeymapLayout from '~/keymap/keymap-layout'

export const Main: React.FC = () => {
	const [data, setData] = useState()
	return <KeymapLayout />
}

export default Main
