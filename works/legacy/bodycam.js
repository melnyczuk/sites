(function () {
  const s = 110;
  const jump = 5.0;

  const vid = document.getElementById('vid');

  vid.addEventListener('loadeddata', loaded);
  vid.addEventListener('timeupdate', frameCheck);
  const loaded = () => vid.addEventListener('canplaythrough', init);

  const init = () => {
    shuffle(vid.duration);
  };

  const shuffle = (duration) => {
    const t = time(duration);
    (t + jump >= s && t <= s + 5) || t + jump > duration
      ? shuffle(duration)
      : (vid.currentTime = t);
  };

  const time = (duration) => duration * Math.random();

  const frameCheck = (duration) => {
    if (jump > 5 && vid.currentTime > duration - 1.5) {
      vid.poster = './37232.png';
      vid.pause();
    } else if (vid.currentTime - time > jump) {
      jump *= 0.95;
      shuffle(duration);
    } else if (jump < 0.1) {
      jump = duration;
      vid.currentTime = s;
    } else {
      vid.play();
    }
  };
})();
