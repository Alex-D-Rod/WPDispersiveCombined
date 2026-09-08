(function () {

  function installFigureFallbacks() {
    document.querySelectorAll('.figure-tile').forEach(function(tile) {
      var img = tile.querySelector('img');
      var placeholder = tile.querySelector('.placeholder');
      if (!img || !placeholder) return;
      var file = tile.getAttribute('data-file') || img.getAttribute('src') || '';
      placeholder.innerHTML = '<div><strong>Figure placeholder</strong><br><span>' + file + '</span></div>';
      if (img.complete && img.naturalWidth === 0) tile.classList.add('missing');
      img.addEventListener('error', function() { tile.classList.add('missing'); });
      img.addEventListener('load', function() { tile.classList.remove('missing'); });
    });
  }

  function typesetMath() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch(function(err) { console.warn(err.message); });
    }
  }

  var intervalFrame;

  function animateTimeIndex() {
    cancelAnimationFrame(intervalFrame);
    var slide = Reveal.getCurrentSlide();
    var interval = slide && slide.querySelector('.pc-growing-interval');
    if (!interval) return;
    var label = interval.querySelector('.pc-time-index');
    var animation = interval.getAnimations().find(function(item) {
      return item.animationName === 'pcIntervalGrow';
    });
    if (!label || !animation) return;
    animation.currentTime = 0;
    var index = 0;
    var lastIteration = -1;
    label.textContent = '0';

    function update() {
      var timing = animation.effect.getComputedTiming();
      var duration = animation.effect.getTiming().duration;
      var elapsed = Number(animation.currentTime) % duration;
      if (timing.currentIteration !== lastIteration || elapsed <= duration * 0.18) {
        index = 0;
      } else {
        index += 1;
      }
      lastIteration = timing.currentIteration;
      label.textContent = String(index);
      intervalFrame = requestAnimationFrame(update);
    }
    intervalFrame = requestAnimationFrame(update);
  }
  

  installFigureFallbacks();

  Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: false,
    slideNumber: 'c/t',
    transition: 'slide',
    backgroundTransition: 'fade',
    width: 1280,
    height: 720,
    margin: 0.045,
    minScale: 0.25,
    maxScale: 1.5
  });

  Reveal.on('ready', function() {
    installFigureFallbacks();
    typesetMath();
    animateTimeIndex();
  });
  Reveal.on('slidechanged', function() {
    typesetMath();
    animateTimeIndex();
  });
})();
