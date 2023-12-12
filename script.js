$(document).ready(function(){
    
  var mainSlideSwiper = new Swiper('.main_banner_container', {

      direction: "horizontal",
      slidesPerView : 3,
      spaceBetween: 20,
      observer: true,
      observeParents: true,
      autoplay: {
        delay : 3000,
          disableOnInteraction: false,
      },
      watchOverflow: false,
      
      pagination: {
          el: ".main_banner_pagination",
          type: "fraction",
      },

      navigation: {
          nextEl: ".main_banner_btn_next",
          prevEl: ".main_banner_btn_prev",
      },
  }); 


  /**
  * 해시태그 가져와서 넣기
  */
  var hashtagTitle = $('.df-bannermanager-kjy-test-banner').find('a:eq(0)').find('span.banner_title').html().split(','); // 첫 번째 배너 : 해시태그 내용 가져오는 용도

  $.each(hashtagTitle, function(index, value){
      $('.main_hashtag').append($('<span>' + '#' + value + '</span>')); // .main_hashtag의 자식으로 해시태그 내용들 span으로 추가
  });


  /**
  * 배너 타이틀 수정
  */
  var bannerTitleGroup = $('.df-bannermanager-kjy-test-banner').find('span.banner_title');

  bannerTitleGroup.each(function(){
      var bannerTitleSplit = $(this).html().split('$'); // $를 기준으로 배너 타이틀 자르기
      $(this).html(bannerTitleSplit[0]); // 배너별 타이틀에서 해시태그 부분빼서 html에 넣기

      $(this).closest('a.main_banner_item').attr('data-hashtag', bannerTitleSplit[1]); // 배너 타이틀에서 $를 기준으로 잘라낸 해시태그 부분 data-hashtag로 부여

  });


  /*
  * 해시태그 클릭 이벤트 (하이라이트 + 클릭한 해시태그와 data-hashtag와의 일치 여부 확인)
  */
  $('.main_hashtag').children('span').on('click', function(){
      var hashtagName = $(this).html(); // 클릭한 해시태그 이름

      // 해시태그 클릭 이벤트 (.active)
      $('.main_hashtag span').removeClass('active');
      $(this).addClass('active'); // 핑크 하이라이트 넣기

      $('a.main_banner_item').removeClass('displaynone');
      $('a.main_banner_item').not("[data-hashtag*='" + hashtagName + "']").addClass('displaynone'); //클릭한 해시태그 값과 data-hashtag 값이 일치하지 않으면 숨기기

      if(hashtagName == "#전체"){
          $('a.main_banner_item').removeClass('displaynone'); // 전체태그에서는 모든 슬라이드 보여주기
          $('a.main_banner_item:first-of-type').addClass('displaynone');  // 해시태그 가져오기용 첫번째 배너만 숨기기
      }

      mainSlideSwiper.update(); // 메인 슬라이드의 스와이퍼 초기화
  });


});