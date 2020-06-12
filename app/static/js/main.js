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
                                "<input type=\"checkbox\" class=\"todo-checkbox\">\n" +
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

    $(".todo-task-list").on("click", ".todo-task .todo-checkbox", function(){

        if (this.checked){
            $(this).parent().find("span").addClass("todo-done");
            $(this).parent().parent().addClass("list-group-item-light");
        }else {
            $(this).parent().find("span").removeClass("todo-done");
            $(this).parent().parent().removeClass("list-group-item-light");
        }



    });
});
