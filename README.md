## 설명

  배너매니저를 활용한 슬라이드 구현
  
### 작업 내용

  배너매니저 앱 한 개로 슬라이드 관리가 용이하도록 제작했습니다.
  
### 주안점

<!--
  (Optional)
  리뷰 시에 유심히 봐주었으면 하는 부분을 설명합니다.
-->

![image](https://github.com/ivZyoon/mongze/assets/151108458/5cfb4b4a-5ab2-4a7c-90fa-a1b4877516f1)

해시태그 카테고리 변경 시, 스와이퍼가 DOM 변화를 감지하지 못하는 이슈가 있습니다.
이를 해결하기 위해 카테고리를 클릭할 때마다 스와이퍼를 초기화하면 된다고 알려주셨으나 잘 찾지 못했습니다..

제가 사용한 방법은 다음과 같습니다.
1) observer: true
   - swiper의 스타일이 변경(display 옵션 관련)되거나 하위 요소를 수정할 때마다 업데이트(재초기화) 되는 스와이퍼 옵션
   - 그러나 해당 옵션을 넣어도 swiper가 변화를 인식하지 못했습니다.
   - 제가 사용한 예시가 아니라면 observer는 정확히 어떠한 컨디션일 때 사용하는지 궁금합니다.
   - ㄴ> 제가 생각한 예시는 스와이퍼 안에 들어가는 slide들의 display none 여부가 아니라 스와이퍼 기능이 들어가는 요소 자체의 display 값이 변경될 때 사용하는 거였습니다 ex) 팝업 내 슬라이드가 존재할 때

2) on: init()
   - on 속성 내에 init을 넣고 실행시키는 방법
   - 초기화 함수와 swiper 가동 함수를 하나로 작성해보기도 하고, 분리해서 작성해보기도 했는데 둘 다 작동이 안 된 상태입니다.
   - 이 부분을 사용할 때 가장 어려웠던 부분은 init(function(){}); 에서 function 내에 뭘 넣어야 하는지?.. 가 의문이었습니다....
  
3) destroy
   - 스와이퍼를 제대로 작동시킨 뒤에 클릭할 때마다 destroy 하고 다시 생성하는 방식이었는데 이 부분 역시 function 안에 내용을 어떻게 적어야 할지 몰라 시도가 어려웠습니다..
  

세 방법 다 아니라면...... 어떤 방법을 써야하는지 알고 싶습니다........ 🥲


### 2차 피드백 질문사항 추가 
마지막으로 코멘트해주셨던 부분을 제가 생각하는 방향으로 수정해보았습니다.
제가 답글로 말씀드린 바와 같이 페이지네이션의 패딩과 크기가 달라지거나 버튼의 높이가 달라지면 71px과 30px 모두 수정해주어야 하기때문에 유지보수가 어려울 것 같습니다.
따라서 최대한 직계부모인 .main_banner_box의 높이값에서 페이지네이션이 빠지는 게 계산이 용이할 것 같아 **페이지네이션에 absolute**를 주고 밖으로 빼주었습니다.

그러다보니 absolute로 빼준 페이지네이션의 영역을 확보할 방법이 필요했는데요, 직계부모인 .main_banner_box에 높이값을 주어서 영역을 만들면 페이지네이션을 밖으로 뺀 의미가 없는 것 같아서 조금 먼 부모지만 전체 슬라이드 영역인 .main_slide_area 에 padding-bottom 값을 넉넉히 주어 페이지네이션의 영역을 만들어주었는데, 혹시 이런 방법으로 영역을 잡아도 맞는 건지 여쭤보고 싶습니다!


### 연장 과제 피드백 질문사항 추가
스크립트 44, 46, 49번째 줄 부분에서 각 줄마다 액션은 다르지만 묘하게 시작부분이 중복되는 느낌이 있어 코드가 정돈되지 않은 느낌이 듭니다.
이 부분을 좀 더 간결하게 만들 수 있는 방법이 있을까요? 