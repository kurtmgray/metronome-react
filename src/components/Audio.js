function Audio() {
    const context = new AudioContext()
    console.log(context)
    const masterGainNode = Audio.context.createGainNode()
}

export default Audio