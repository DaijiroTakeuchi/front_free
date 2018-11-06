// navigator.userAgent: 現在のブラウザのユーザエージェントを表す文字列を返す
// toLowerCase: 文字列の中の大文字を小文字に変換した新しい文字列を返す
// var ua = navigator.userAgent.toLowerCase();
// console.log(ua);

// js (jQuery)
// メディア タブ切り替え
$('.mediaNavItem').on('click', function() {
    // nav アクティブ切り替え
    $('.mediaNavItem').removeClass('mediaNavItem-active');
    $(this).addClass('mediaNavItem-active');

    // body アクティブ切り替え
    $('.mediaBodyItem').removeClass('mediaBodyItem-active');
    var index = $(this).data('media');
    $('.mediaBodyItem[data-media=' + index + ']').addClass('mediaBodyItem-active');
});

var para = document.querySelector('p');

para.addEventListener('click' , updateName);

function updateName() {
    var name = prompt('名前を入力してください');
    para.textContent = 'Player 1:' + name;
}

// // snap.svgを使用したアニメーション
//
// var $circle = Snap( '.circle1' );
//
// function anim () {
//
//     // cx の値を 0 にリセット
//     $circle.attr( { cx: 0 } );
//
//     // cx の値を 5 秒かけて 1000 にアニメーションする
//     $circle.animate( {
//         cx: 1000
//     }, 5000, function () {
//         anim();
//     } );
//
// };
//
// anim();
//
//
// var $allow = Snap('.allow');
//
// $($allow).animate({"marginLeft":"100px"},2000,"swing", function() {
//
//     $(this).addClass('blue');
// })

var s = Snap("#svg");
var bigCircle = s.circle(150, 150, 100);
bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
});
// ミニ円
var smallCircle = s.circle(100, 150, 70);
var discs = s.group(smallCircle, s.circle(200, 150, 70));
discs.attr({
    fill: "#fff"
});
bigCircle.attr({
    mask: discs
});
smallCircle.animate({r: 50}, 1000);
discs.select("circle:nth-child(2)").animate({r: 50}, 1000);
var p = s.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
    fill: "none",
    stroke: "#bada55",
    strokeWidth: 5
});
p = p.pattern(0, 0, 10, 10);
bigCircle.attr({
    fill: p
});
// discs.attr({
//     fill: Snap("#pattern")
// });
discs.attr({fill: "r()#fff-#000"});
discs.attr({fill: "R(150, 150, 100)#fff-#000"});
