'use strict';

{   function play(){
    setTimeout(() => {
        images[currentIndex].classList.remove('current');
        currentIndex++;
        if(currentIndex>images.length-1){
            currentIndex = 0;
        }
        images[currentIndex].classList.add('current');
        play();
    }, 5000);
    }

    function inViewcallback(entries,obs){
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                return;
            }
            entry.target.classList.add('appear');
            obs.unobserve(entry.target);
        });
    }
    function onScrollcallback(entries){
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                header.classList.add('scrolled');
                totop.classList.add('scrolled');

            } else {
                header.classList.remove('scrolled');
                totop.classList.remove('scrolled');

            }
        });

    }
    const images = document.querySelectorAll('.hero img');
    const header = document.querySelector('header');
    const totop = document.getElementById('to-top')
    const inViewobserver = new IntersectionObserver(inViewcallback,{
        threshold: 0.2,
    });
    const onScrollobserver = new IntersectionObserver(onScrollcallback);

    let currentIndex = 0;

   play();
   document.querySelectorAll('.animate').forEach(el => {
   inViewobserver.observe(el);
   });
   onScrollobserver.observe(document.getElementById('target'));
   totop.addEventListener('click', e => {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
   });
}