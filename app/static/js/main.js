$(document).ready(function(){
    $(".todo-input").keypress(function(e){
        let pressedKey = e.which || e.keyCode;
        if (pressedKey===13){
            let nextTask = $(this).val();
            $(this).val("");
            if (nextTask===""){
                return false;
            } else {
                let taskHTML = "<li class=\"list-group-item todo-task\">\n" +
                                "<label class=\"todo-label\">\n" +
                                "<input type=\"checkbox\">\n" +
                                "<span>" +nextTask+ "</span>" +
                                "</label>\n" +
                                "<button class=\"todo-quit\"><i class=\"fa fa-minus-circle\"></i></button>\n" +
                                "</li>";
                $(".todo-task-list").append(taskHTML);
                $(this).val("")
            }
        }
    });

    $(".todo-task-list").on("click", ".todo-task .todo-quit", function(){
       $(this).parent().remove();
    });
});
