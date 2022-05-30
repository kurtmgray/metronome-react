// const sounds = {
//   boom: "http://127.0.0.1:5501/sounds/boom.wav",
//   clap: "http://127.0.0.1:5501/sounds/clap.wav",
//   hihat: "http://127.0.0.1:5501/sounds/hihat.wav",
//   kick: "http://127.0.0.1:5501/sounds/kick.wav",
//   openHihat: "http://127.0.0.1:5501/sounds/openhat.wav",
//   ride: "http://127.0.0.1:5501/sounds/ride.wav",
//   snare: "http://127.0.0.1:5501/sounds/snare.wav",
//   claves: "http://127.0.0.1:5501/sounds/tink.wav",
//   tom: "http://127.0.0.1:5501/sounds/tom.wav",
// };

const sounds = {
  digital: {
    down: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/digital/down.wav",
    tap: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/digital/tap.wav",
    up: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/digital/up.wav",
  },
  drumkit: {
    boom: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/boom.wav",
    hihat:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/hihat.wav",
    kick: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/kick.wav",
    openhat:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/openhat.wav",
    ride: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/ride.wav",
    snare:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/snare.wav",
    tom: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/drumkit/tom.wav",
  },
  electrodrum: {
    eHiHat:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/electrodrum/eHiHat.wav",
    eKick:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/electrodrum/eKick.wav",
    eSnare:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/electrodrum/eSnare.wav",
  },
  tabla: {
    dha: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/tabla/dha.wav",
    dhin: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/tabla/dhin.wav",
    tin: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/tabla/tin.wav",
  },
  yamaha: {
    yCowbell:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/yamaha/yCowbell.wav",
    yKick:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/yamaha/yKick.wav",
    yRide:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/yamaha/yRide.wav",
    yRim: "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/yamaha/yRim.wav",
    yShaker:
      "https://metronome-sounds.s3.us-west-1.amazonaws.com/sounds/yamaha/yShaker.wav",
  },
};
export default sounds;
