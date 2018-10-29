jQuery( function ($) {
    // variables
    var isNarrowDevice      = '';
    var functionPCFlag      = false;
    var functionSPFlag      = false;
    var breakPointSP        = 767;
    var tagTargetBody       = 'body';
    var classTargetHeader   = '.js-header';
    var classTargetHeaderCloned = '.js-header.js-cloned';
    var classButtonBurger   = '.js-button-burger';
    var classSubnavTrigger  = '.js-subnav-trigger';
    var classSubnavParent   = '.js-subnav-parent';
    var classSubnavTarget   = '.js-subnav-target';
    var classPC             = 'js-pc';
    var classSP             = 'js-sp';
    var classActive         = 'js-active';
    var classHover          = 'js-hover';
    var classCloned         = 'js-cloned';
    var classFixed          = 'js-fixed';
    var classOpen           = 'js-open';
    var eventStart          = ( ( window.ontouchstart !== null )?'mouseenter':'touchend' );
    var eventEnd            = 'mouseleave';

    // variables $
    var $window             = $( window );
    var $targetBody         = $( tagTargetBody );
    var $targetHeader       = $( classTargetHeader );
    var $targetHeaderCloned = $( classTargetHeaderCloned );
    var $buttonBurger       = $( classButtonBurger );
    var $subnavTrigger      = $( classSubnavTrigger );
    var $subnavParent       = $( classSubnavParent );
    var $subnavTarget       = $( classSubnavTarget );

    // resetPC
    var resetPC = function () {
        $targetBody.removeClass( classSP ).addClass( classPC );
        if ( $targetHeader.hasClass( classActive ) ) {
            $targetHeader.removeClass( classActive );
        }
        if ( $subnavParent.hasClass( classOpen ) ){
            $subnavParent.removeClass( classOpen );
        }
        $subnavTarget.removeAttr( 'style' );
    };

    // headerPC
    var headerPC = function () {
        // header cloned
        if ( !( $targetHeaderCloned.length ) ){
            $targetHeader.clone().addClass( classCloned ).prependTo( tagTargetBody );
        }

        // header scroll fixed
        $window.scroll( function () {
            var scrollTop      = $( this ).scrollTop();
            var distance       = 200;
            var scrollHeight   = $( document ).height();
            var scrollPosition = $window.height() + $window.scrollTop();
            if ( scrollTop < distance ){
                $( classTargetHeaderCloned ).removeClass( classFixed );
                $( classSubnavParent ).removeClass( classHover );
            } else {
                $( classTargetHeaderCloned ).addClass( classFixed );
            }
        } );

        // subnav cloneにも適用
        $( classSubnavParent ).on( eventStart, function () {
            var $this = $( this );
            if ( $this.hasClass( classHover ) ){
                $this.removeClass( classHover );
            } else {
                $this.addClass( classHover );
            }
        } ).on( eventEnd, function () {
            var $this = $( this );
            $this.removeClass( classHover );
        } );
    };

    // resetSP
    var resetSP = function () {
        $targetBody.removeClass( classPC ).addClass( classSP );
        if ( $targetHeader.hasClass( classActive ) ) {
            $subnavParent.removeClass( classHover );
        }
        if ( $subnavParent.hasClass( classHover ) ) {
            $subnavParent.removeClass( classHover );
        }
        $subnavTarget.hide().removeClass( classOpen );
    };

    // headerSP
    var headerSP = function () {
        // buttonBurger
        $buttonBurger.on( 'click', function () {
            $targetHeader.toggleClass( classActive );
        } );

        // subnav
        $subnavTrigger.on( 'click', function () {
            var $this = $( this );
            if ( $this.parent( classSubnavParent ).hasClass( classOpen ) ){
                $this.parent( classSubnavParent ).removeClass( classOpen );
                $this.next( classSubnavTarget ).stop().slideUp();
            } else {
                $this.parent( classSubnavParent ).addClass( classOpen );
                $this.next( classSubnavTarget ).stop().slideDown();
            }
        } );
    };

    // load width check
    if ( $window.width() > breakPointSP ) {
        isNarrowDevice = 'PC';
        functionPCFlag = true;
        resetPC();
        headerPC();
    } else {
        isNarrowDevice = 'SP';
        functionSPFlag = true;
        resetSP();
        headerSP();
    }

    // resize width check
    $window.resize( function () {
        var timer = false;
        if ( !timer ) clearTimeout( timer );
        timer = setTimeout( function () {
            if ( $window.width() > breakPointSP ) {
                if ( isNarrowDevice != 'PC' ) {
                    isNarrowDevice = 'PC';
                    resetPC();
                    if ( !functionPCFlag ) {
                        functionPCFlag = true;
                        headerPC();
                    }
                }
            } else {
                if ( isNarrowDevice != 'SP' ) {
                    isNarrowDevice = 'SP';
                    resetSP();
                    if ( !functionSPFlag ) {
                        functionSPFlag = true;
                        headerSP();
                    }
                }
            }
        }, 200 );
    } );

    // smoothscroll
    $( 'a[href^="#"]' ).on( 'click', function ( e ) {
        e.preventDefault();
        var position = 0;
        var speed    = 400;
        var href     = $( e.currentTarget ).attr( 'href' );
        var target   = $( href === '#' || href === '' ? 'html' : href );
        if ( $window.width() > breakPointSP ) {
            position = target.offset().top - 100;
        } else {
            position = target.offset().top - 70;
        }
        $( 'body, html' ).animate( { scrollTop: position }, speed, 'swing' );
    } );
} );
