const dynamicHeader = () => {
  $(window).on('scroll', (e)=> {
    let posY = window.scrollY;
    let target = $('.main')[0].offsetTop;
    let margin = $('.header h1').height();
    let top = parseInt($('.header h1').css('margin-top').split("p")[0]);
    if (posY + margin + 90 > target && top > -50) {
      $('.header h1').css('margin-top', `${top-10}px`);
    } else if (posY + margin + 90 < target) {
      $('.header h1').css('margin-top', '20px');
    }
  });
};

export default dynamicHeader;
