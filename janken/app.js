interval = 100;
gu_img = '<img src="img/gu.png">';
tyoki_img = '<img src="img/tyoki.png">';
pa_img = '<img src="img/pa.png">';
again_bt = '<button class="again btn btn-primary" data-hand="again">もう一度</button>';
end_bt = '<button class="end btn btn-primary ml-3" data-hand="fisnish">終わり</button>';
hand_bt = ' <button data-hand="1" class="player btn btn-primary"  >グー</button> <button data-hand="2" class="player btn btn-primary ml-3"  >チョキ</button> <button data-hand="3" class="player btn btn-primary ml-3"  >パー</button> ';


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
    $('.player_button_title').text("");
  }

});
