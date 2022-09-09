
// This function is used to detect the user's FPS. In the future, this will be used to determine the performnace of the parallax and trigger appropriate fallbacks. -sg

// for reference check out https://www.afasterweb.com/2018/06/29/responding-to-jank-in-real-time/


const isBrowser = typeof window !== "undefined"


if (isBrowser) {
window.jankcb = function(callback) {
    // console.log('Starting JankCB...');

    // Check for callback
    if (typeof callback !== 'function') {
      return;
    }

    // Check for rAF
    if (!window.requestAnimationFrame) {
      callback();
      return;
    }

    var delta = 0;
    var fps = 0;
    var lastTimestamp = 0;
    var ticks = 0;
    var misses = 0;
    var rAF = window.requestAnimationFrame;
    var minFps = 30;
    var maxMisses = 6;

    var updateFps = function(timestamp) {
      if (ticks === 0) {
        lastTimestamp = timestamp;
      }

      if (timestamp < lastTimestamp + 1000) {
        ticks += 1;
      } else {
        delta = timestamp - lastTimestamp;
        fps = ticks / (delta / 1000);
        // console.log('FPS:', fps);

        if (fps < minFps) {
          misses += 1;
          // console.log('Miss: ', misses);
          if (misses >= maxMisses) {
            // console.log('Triggering Callback');
            callback();
            return;
          }
        }
        ticks = 0;
      }

      rAF(updateFps);
    };

    rAF(updateFps);
  };
}
