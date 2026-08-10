(function () {
    const toggle = document.getElementById('cmpNavToggle');
    const links = document.getElementById('cmpNavLinks');

    function closeMenu() {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('i').className = 'ph ph-list';
    }

    toggle.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        toggle.querySelector('i').className = open ? 'ph ph-x' : 'ph ph-list';
    });

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    const backTop = document.getElementById('cmpBackTop');
    const footer = document.querySelector('.cmp-footer');

    window.addEventListener('scroll', function () {
        backTop.classList.toggle('show', window.scrollY > 600);

        const nearBottom = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 20;
        backTop.style.bottom = nearBottom ? (footer.offsetHeight + 14) + 'px' : '';
    }, { passive: true });

    backTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
