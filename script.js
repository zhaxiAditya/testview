window.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a.page-scroll');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            var targetId = this.getAttribute('href').substring(1); // Mengambil id tujuan tanpa tanda '#'
            var targetElement = document.getElementById(targetId); // Mendapatkan elemen tujuan berdasarkan id

            if (targetElement) {
                event.preventDefault(); // Mencegah perilaku default dari klik

                var targetOffset = targetElement.getBoundingClientRect().top; // Mendapatkan jarak elemen tujuan dari atas layar
                var startOffset = window.pageYOffset || document.documentElement.scrollTop; // Mendapatkan posisi vertikal saat ini dari halaman

                var startTime = null;

                // Fungsi animasi pergeseran halaman
                function scrollToTarget(timestamp) {
                    if (!startTime) startTime = timestamp;

                    var progress = timestamp - startTime;
                    var duration = 500; // Durasi animasi dalam milidetik

                    // Fungsi easing (linear)
                    function linear(t) {
                        return t;
                    }

                    var easingProgress = linear(Math.min(progress / duration, 1));

                    window.scrollTo(0, startOffset + targetOffset * easingProgress);

                    if (progress < duration) {
                        requestAnimationFrame(scrollToTarget);
                    }
                }

                // Memulai animasi
                requestAnimationFrame(scrollToTarget);
            }
        });
    });
});
