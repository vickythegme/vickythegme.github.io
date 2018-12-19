$(document).ready(function() {

    function link(button, event) {
        button = (button == 'finish') ? $("#finish") : $("a[href='#"+button+"']");
        result = (event == 'show') ? button.show() : button.hide();
        return result;
    }

    function showBlock(blockId, event) {
        return (event == 'show') ? $(blockId).show() : $(blockId).hide(); 
    }

    var step = "steps-uid-0",
    steps = parseInt($("#steps-uid-0 fieldset").length),
    stepField = "#"+step+"-p-",
    stepHeading = "#"+step+"-h-",
    stepWizard = "#"+step+"-t-";

    $("a[href='#next']").on('click', function(e) {
        e.preventDefault();
        for (var i = 0; i < steps; i++) {
            if($(stepField+i).css('display') == 'block') {
                nxt = parseInt(i)+1;
                if(i == steps-2){
                    link('previous', 'show'); 
                    link('next', 'hide');
                    link('finish', 'show');
                } else {
                    link('previous', 'show'); 
                    link('next', 'show');
                    link('finish', 'hide');
                }  
                $(stepField+nxt).show();
                $(stepField+i).hide();
                $(stepWizard+i).parent().addClass('done').removeClass('current disabled');
                $(stepWizard+nxt).parent().addClass('current').removeClass('done disabled');
                break;  
            }
        }
    }); 

    $("a[href='#previous']").on('click', function(e) {
        e.preventDefault();
        for (var i = 0; i < steps; i++) {
            if($(stepField+i).css('display') == 'block') {
                prev = parseInt(i)-1;
                if(prev == 0){
                    link('previous', 'hide'); 
                    link('next', 'show');
                    link('finish', 'hide');
                } else {
                    link('previous', 'show'); 
                    link('next', 'show');
                    link('finish', 'hide');
                }  
                $(stepField+prev).show();
                $(stepField+i).hide();
                $(stepWizard+i).parent().addClass('done').removeClass('current disabled');
                $(stepWizard+prev).parent().addClass('current').removeClass('done disabled');
                break;  
            }
        }
    });

    $(".steps a").on('click', function(e) {
        e.preventDefault();
        var li = $(this).parent(),
        selector = $(this).attr('aria-controls'),
        num = selector.split('-p-')[1];
        for (var i = 0; i < steps; i++) {
            if(!$(stepWizard+i).parent().hasClass('disabled')) {
                if(!li.hasClass('disabled')) {
                    $(stepField+i).hide();
                    $(stepWizard+i).parent().addClass('done').removeClass('current');
                    li.addClass('current').removeClass('done');
                    if(num == 0){
                        link('previous', 'hide');
                        link('next', 'show');
                        link('finish', 'hide');
                    } else if(num == steps-1) {
                        link('finish', 'show');
                        link('next', 'hide');
                        link('previous', 'show');
                    } else {
                        link('previous', 'show');
                        link('next', 'show');
                        link('finish', 'hide');
                    }
                    $("#"+selector).show();
                }
            }
        }
    });

});