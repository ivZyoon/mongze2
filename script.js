var swiper = new Swiper('.swiper-container', {

  direction: "horizontal",
  slidesPerView : 3,
  spaceBetween: 20,
  observer: true,
  observeParents: true,
  //autoplay: true, 

  pagination: {
      el: ".swiper-pagination",
      type: "fraction",
  },

  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },

  on: {
    init: function(){
          console.log("swiper 초기화 될 때 실행");
      },
      imagesReady : function(){ // 모든 내부 이미지가 로드된 직후 이벤트 시작
          console.log("슬라이드 이미지 로드 후 실행");
      },
  },
}); 



$('.df-bannermanager-kjy-test-banner').children('a:eq(0)').addClass('displaynone'); // 첫번째 배너 숨기기

/**
* 해시태그 가져와서 넣기
*/
var hashtagTitle = $('.df-bannermanager-kjy-test-banner').find('a:eq(0)').find('span.banner_title').html().split(',');
$('.main_hashtag').children('span').each(function(index){
  $(this).html('#' + hashtagTitle[index]);
});


/**
* 배너 타이틀 수정 / 해시태그 클릭 이벤트('.active') / 해시태그와 같은 배너 찾기
*/
var bannerTitleGroup = $('.df-bannermanager-kjy-test-banner').find('span.banner_title');

bannerTitleGroup.each(function(){
  var bannerTitleSplit = $(this).html().split('$');
  $(this).html(bannerTitleSplit[0]); // 배너별 타이틀에서 해시태그 부분은 안보이게 html 수정
  
  $(this).closest('a.main_banner_item').attr('data-hashtag', bannerTitleSplit[1]);
  
});


$('.main_hashtag').children('span').on('click', function(){
  var hashtagName = $(this).html();
  // 해시태그 클릭 이벤트 (.active)
  $('.main_hashtag').children('span').each(function(){

      $(this).removeClass('active');
  })
  
  $(this).addClass('active');
  
  $("[data-hashtag*='" + hashtagName + "']").removeClass('displaynone');
  $('a.main_banner_item').not("[data-hashtag*='" + hashtagName + "']").addClass('displaynone');
  
  
  if(hashtagName == "#전체"){
    $('a.main_banner_item').removeClass('displaynone');
      $('a.main_banner_item:first-of-type').addClass('displaynone');
  }
  
  // 그치만 안된다.....
$(swiper).on('init', function(){
    console.log('slide가 초기화 설정을 마친 후 실행');
  });
  console.log("초기화가 됐어요");
});











