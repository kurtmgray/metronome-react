import * as Tone from 'tone'
const players = new Tone.Players({
    hh: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/hihat.mp3",
    bd: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/kick.mp3",
    sn: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/snare.mp3",
    cc: "https://oramics.github.io/sampled/DM/TR-909/Detroit/samples/cymbal.wav"
  }); // .toDestination()
  players.player("sn").volume.value = -4;
  players.player("cc").volume.value = +4;
  
  var reverb = new Tone.Reverb({ decay: 5 });
  
  let wetVol = new Tone.Volume();
  let dryVol = new Tone.Volume();
  
  players.chain(reverb, wetVol);
  players.chain(dryVol);
  
  dryVol.toDestination();
  wetVol.toDestination();
  
  Tone.Transport.schedule(function (time) {
    console.log("ok2?");
    Tone.getTransport().bpm.rampTo(60, 4);
    console.log(wetVol.volume.value);
    wetVol.volume.rampTo(2, 4);
  }, "8:0:0");
  
  let p_dr1 = {
    parts: {
      bd: "1.1...1." + "..1...1.".repeat(7),
      sn: "....1...".repeat(8),
      hh: "1.1.1...1...1...1...1...1...1...".repeat(2),
      cc: "1......." + "........".repeat(7)
    },
    start: "0:0:0",
    bpm: 170,
    timeSignature: 4
  };
  
  let p_dr2 = {
    parts: {
      bd: "1.......1.....".repeat(4),
      sn: "....1......1..".repeat(4),
      hh: "1.1.1.1.1.1.1.".repeat(4),
      cc: "1...........................".repeat(2)
    },
    start: "4:0:0",
    bpm: 120,
    timeSignature: 1.75
  };
  
  function ccc(t) {
    // console.log(t)
    let arr = [];
    let array = t.split("");
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      if (el != ".") {
        const b = Math.floor(i / 16);
        const q = Math.floor(i / 4) % 4;
        const s = i % 4;
        const a = `${b}:${q}:${s}`;
        arr.push({ time: a });
      }
    }
    // console.table(arr)
    return arr;
  }
  
  let p_dr3 = {
    parts: {
      bd: "1.1...1." + "..1...1.".repeat(3) + "1",
      sn: "....1...".repeat(4),
      hh: "1.1.1...1...1...1...1...1...1...".repeat(1),
      cc: "1......." + "........".repeat(3) + "1"
    },
    start: "7:2:0",
    bpm: 110,
    timeSignature: 4
  };
  
  let parts = [];
  let seq = [p_dr1, p_dr2, p_dr3];
  
  seq.forEach((e2) => {
    Object.keys(e2.parts).forEach(function (item) {
      let part = new Tone.Part(function (time) {
        players.player(item).start(time);
      }, ccc(e2.parts[item]));
      part.loopStart = "0:0.0";
      part.loopEnd = "4:0.0";
      part.loop = 1;
      part.start(e2.start);
      parts.push(part);
    });
  
    Tone.Transport.schedule(function (time) {
      console.log("ok?");
      Tone.Transport.bpm.value = e2.bpm;
      Tone.Transport.timeSignature = 3;
    }, e2.start);
  });
  
  Tone.Transport.scheduleRepeat(
    (time) => {
      let t2 = Tone.Transport.position;
      let t3 = Tone.Ticks().toTicks();
      console.log(t2, t3);
      document.querySelector("#i1").innerText = t2
      document.querySelector("#i2").innerText = t3
    },
    "8n",
    "0m",
    "10:0:1"
  );
  
  function t_start() {
    console.log("trying to start");
  
    Tone.start();
  
    wetVol.volume.value = -10;
    dryVol.volume.value = -4;
  
    // Tone.Transport.position = "7:2:0"
    Tone.Transport.position = "0:0:0";
  
    Tone.Transport.start();
  }
  
  function t_stop() {
    console.log("stopping");
    Tone.Transport.stop();
  }
  