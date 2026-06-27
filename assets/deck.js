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
  });
  Reveal.on('slidechanged', function() {
    typesetMath();
  });
})();
