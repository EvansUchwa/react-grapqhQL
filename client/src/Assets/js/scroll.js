document.addEventListener('scroll', () => {
    if (document.querySelector('nav')) {
        if (window.scrollY > 100) {
            if (!document.querySelector('.navOnScroll')) {
                document.querySelector('nav').classList.add('navOnScroll')
            }
        } else {
            document.querySelector('nav').classList.remove('navOnScroll')
        }
    }
})