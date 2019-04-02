
$(document).ready(function () {
    
    //省略号
    $('.goods .goods-name').each(function(){
        var width = $('.goods .goods-name').width();
        var maxwidth = (Math.floor(width / 16) * 2) - 1;
        if($(this).text().length>maxwidth){
            $(this).text($(this).text().substring(0,maxwidth));
            $(this).html($(this).html()+'...');
        }
    });
});