
$(function(){

    /***** ページTOPに移動 *****/
    $("#back-top a").hide();                          /*見えないように隠す*/ 
    $("#back-top a").css("visibility", "visible");    /*隠した後に非表示設定を解除する*/ 
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('#back-top a').fadeIn();
        } 
        else {
            $('#back-top a').fadeOut();
        }
    });
    $("#back-top a").click(function(){
        $("body,html").animate({scrollTop: 0}, 500);
        return false;
    });

})



