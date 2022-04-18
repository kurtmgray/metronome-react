
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    let timerID=null;
    let interval=100;   
    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (e) =>{
        console.log(e)
        if (e.data === "start") {
            console.log("starting");
            timerID = setInterval(() => postMessage("tick"), interval)
        }
        else if (e.data.interval) {
            console.log("setting interval");
            interval=e.data.interval;
            console.log("interval=" + interval);
            if (timerID) {
                clearInterval(timerID);
                timerID = setInterval(() => postMessage("tick"), interval)

            }
        }
        else if (e.data === "stop") {
            console.log("stopping");
            clearInterval(timerID);
            timerID=null;
        }
    }
};

postMessage('worker initialized');