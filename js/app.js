(function () {

    'use strict';

    var template = Handlebars.compile($('#sets-template').html()),
        countdownValue = 3,
        countdownInterval,
        timerValue = 0,
        timerInterval;

    $.getJSON('/data/sets.json').done(function (data) {

        $('.sets').html(template({ sets: data }));

    });

    FastClick.attach(document.body);

    function countdown() {

        if (countdownValue) {

            $('.set-timer-wrapper .number').text(countdownValue--);

        } else {

            clearInterval(countdownInterval);

            timerValue = 0;
            timer();
            timerInterval = setInterval(timer, 1000);

        }

    }

    function timer() {

        if (timerValue <= parseInt($('.sets .set .item.active').data('seconds'), 10)) {

            $('.set-timer-wrapper .number').text(timerValue++);

        } else {

            clearInterval(timerInterval);

            setItemToDone($('.sets .set .item.active'));

            $('.set-timer-wrapper').addClass('hidden');

        }

    }

    function setItemToDone ($item) {

        if ($item.hasClass('active')) {

            $item.addClass('done').removeClass('active');

        } else {

            $item.toggleClass('done');

        }

        if (!$('.sets .set .item:not(.done)').length) {

            $('.sets .btn-reset').addClass('btn-active');

        } else {

            $('.sets .btn-reset').removeClass('btn-active');

        }

    }

    $('.sets').on('click', '.set li', function () {

        var $this = $(this);

        if (parseInt($this.data('seconds'), 10) > 0 && !$this.hasClass('done')) {

            $this.addClass('active');

            $('.set-timer-wrapper').removeClass('hidden');

            countdownValue = 3;
            countdown();
            countdownInterval = setInterval(countdown, 1000);

        } else {

            setItemToDone($(this));

        }

    });

    $('.sets').on('click', '.btn-reset', function () {

        $(window).scrollTop(0);

        $('.sets .set .item.done').removeClass('done').removeClass('active');

    });

    $('.set-timer-wrapper').on('click', function () {

        $(this).addClass('hidden');

        clearInterval(countdownInterval);
        clearInterval(timerInterval);

    });

}());
