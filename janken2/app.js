interval = 100;
gu_img = '<img src="img/gu.png">';
tyoki_img = '<img src="img/tyoki.png">';
pa_img = '<img src="img/pa.png">';
again_bt = '<button class="again btn btn-primary" data-hand="again">もう一度</button>';
end_bt = '<button class="end btn btn-primary ml-3" data-hand="fisnish">終わり</button>';
hand_bt = ' <button data-hand="1" class="player btn btn-primary"  >グー</button> <button data-hand="2" class="player btn btn-primary ml-3"  >チョキ</button> <button data-hand="3" class="player btn btn-primary ml-3"  >パー</button> ';


$(function(){
  i = 1;
  setInterval(function(){
    $('.declaration').fadeToggle();
  },interval);
  setInterval(function(){
    if(i == 3){ $(".cpu_img_anime").html(gu_img); i = 1;
    }else if(i == 2){ $(".cpu_img_anime").html(tyoki_img); i = 3;
    }else if(i == 1){ $(".cpu_img_anime").html(pa_img); i = 2;
    }
  },interval)
});
function hand_print(number,classname){
  if (number == 1) {
    $(classname).append(gu_img);
  }else if(number == 2){
    $(classname).append(tyoki_img);
  }else if(number == 3){
    $(classname).append(pa_img);
  }
}
$('body').on('click','button',function(e){
  hand = $(this).data('hand');
  random = Math.floor( Math.random() * 3 ) + 1;
  player = ".player_img";
  cpu = ".cpu_img";
  jud = "";

  $(".cpu_img_anime").remove();

  if(typeof hand === 'number'){
    hand_print(hand, player);
    hand_print(random, cpu);

    if(hand - random == 0){
      jud = "引き分け";
    }else if(hand - random == -1 || hand - random == 2){
      jud = "あなたの勝ち";
    }else if(hand - random == 1 || hand - random == -2){
      jud = "あなたの負け";
    }
  }

  $('.player_hand_button').empty();
  if(hand >= 0){
    $('.jud').text(jud);
    $('.player_button_title').text("もう一回遊ぶ？ ");
    $('.player_hand_button').append(again_bt);
    $('.player_hand_button').append(end_bt);
  }
  if(hand == "again"){
    $(".img").empty();
    $('.jud').text('');
    $(".cpu_hand").append('<div class="cpu_img_anime"></div>')
    $('.player_button_title').text("選択してね");
    $('.player_hand_button').append(hand_bt);
  }else if(hand == 'fisnish'){
    $('.player_hand_button').empty();
    $('.jud').empty();
    $('.player_button_title').text("終わり");
  }

});
