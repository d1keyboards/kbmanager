type KeyDefinition = {
	label: string
	code: string
	size: number
}

type KeySource = KeyDefinition[][]

const key = (
	code: string,
	label: string = code,
	size: number = 1
): KeyDefinition => ({
	code,
	label,
	size,
})

const ansi: KeySource = []
const quantum: KeySource = []
const media: KeySource = []
const settings: KeySource = []

export default {
	ansi,
	quantum,
	media,
	settings,
}
