(function($) {
  'use strict';
  $(function() {
    $('[data-bs-toggle="offcanvas"]').on("click", function() {
      $('#sidebar').toggleClass('active')
    });
  });
})(jQuery);