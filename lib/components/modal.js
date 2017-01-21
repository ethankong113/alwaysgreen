const createModal = () => {
  $('.about-btn').click((e)=>{
    $('.modal').css('visibility', 'visible');
    $('body').css('overflow', 'hidden');
  });

  $('.close-btn').click((e)=>{
    e.stopPropagation();
    $('.modal').css('visibility', 'hidden');
    $('body').css('overflow', 'auto');
  });

  $('.modal-frame .modal-content').click((e)=> {
    e.stopPropagation();
  });

  $('.modal').click((e)=>{
    $('.modal').css('visibility', 'hidden');
    $('body').css('overflow', 'auto');
  });
};

export default createModal;
