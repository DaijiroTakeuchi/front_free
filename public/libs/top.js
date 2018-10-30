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
