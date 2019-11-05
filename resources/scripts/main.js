
$(document).ready(function () {

    $(".img-container")
        .click(function(){
            if($(this).siblings("#img-info").hasClass("show")){
                $(this).siblings("#img-info").collapse('hide');
                return false;
            }
            $(this).siblings("#img-info").collapse('show');
        })
});