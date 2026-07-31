document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    var setOpen = function (isOpen) {
      nav.classList.toggle('open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  }

  document.querySelectorAll('.dropdown-arrow').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var item = btn.closest('.nav-item');
      if (item) { item.classList.toggle('open'); }
    });
  });
});
