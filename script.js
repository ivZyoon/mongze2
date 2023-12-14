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
    * 배너 타이틀 수정
    */
    var bannerTitleGroup = $('.df-bannermanager-kjy-test-banner span.banner_title');
    var splitArray = [] // 해시태그 담아 둘 새 배열 만들기

    bannerTitleGroup.each(function(){
        var bannerTitleSplit = $(this).html().split('$'); // $를 기준으로 배너 타이틀 자르기
        $(this).html(bannerTitleSplit[0]); // 배너별 타이틀에서 해시태그 부분빼서 html에 넣기

        $(this).closest('a.main_banner_item').attr('data-hashtag', bannerTitleSplit[1]); // 배너 타이틀에서 $를 기준으로 잘라낸 해시태그 부분 data-hashtag로 부여

        splitArray.push(bannerTitleSplit[1]); // 해시태그부분만 잘라서 새 배열(splitArray) 만들기
    });    

    splitArray = splitArray.join('').split('#'); // 해시태그가 담긴 배열을 문자열로 반환한 뒤(배너 1개에 해시태그 2개인 경우 때문), 다시 # 기준 split 해서 배열 수정

    splitArray = splitArray.filter(function(item){ // 배열 내 빈 값 모두 제거
        return !!item
    });
    splitArray = splitArray.filter((v, i) => splitArray.indexOf(v) === i); // 배열 내 중복 값 제거

    $.each(splitArray, function(index, value){
        $('.main_hashtag').append($('<li>' + '#' + value + '</li>')); // .main_hashtag의 자식으로 해시태그 내용들 li로 추가
    });


    /*
    * 해시태그 클릭 이벤트 (하이라이트 + 클릭한 해시태그와 data-hashtag와의 일치 여부 확인)
    */
    $('.main_hashtag li').on('click', function(){
        var hashtagName = $(this).html(); // 클릭한 해시태그 이름

        // 해시태그 클릭 이벤트 (.active)
        $('.main_hashtag li').removeClass('active');
        $(this).addClass('active'); // 핑크 하이라이트 넣기


        hashtagName === "#전체"
		? $('a.main_banner_item').removeClass('displaynone') // #전체 일 때 전부 보이기
        : (
            $('a.main_banner_item').removeClass('displaynone'), 
            $('a.main_banner_item').not('[data-hashtag*="' + hashtagName + '"]').addClass('displaynone')  //클릭한 해시태그 값과 data-hashtag 값이 일치하지 않으면 숨기기  
        );    

        mainSlideSwiper.update(); // 메인 슬라이드의 스와이퍼 초기화
    });


});