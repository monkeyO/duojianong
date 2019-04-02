$(document).ready(function () {
    $('.select-list').on('touchstart', 'li', function () {
        $('#card').text($(this).text());
        if ($('#card').text() == '银行卡') {
            $('.checkbox').removeClass('hidden');
            $('.bank').removeClass('hidden');
            $('.card-number').removeClass('hidden');
            $('.account-number').addClass('hidden');
        } else {
            $('.checkbox').addClass('hidden');
            $('.bank').addClass('hidden');
            $('.card-number').addClass('hidden');
            $('.account-number').removeClass('hidden');
        }
    })
    $('.checkbox').on('click', 'div', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })


    //银行卡号每四位空一格
    $('.card-number').on('input propertychange', 'input', function () {
        var oValue = $(this).val();
        if(/\S{5}/.test(oValue)){
            $(this).val(oValue.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "));
        }
    })
})