// function to append new task to list
$(".todo-input").keypress(function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13){
        let nextTask = $(this).val();
        $(this).val("");
        if (nextTask===""){
            return false;
        } else {
            let taskHTML = "<li class=\"list-group-item todo-task todo-active\">\n" +
                            "<label class=\"todo-label\">\n" +
                            "<input type=\"checkbox\" class=\"todo-checkbox\">\n" +
                            "<span>" +nextTask+ "</span>" +
                            "</label>\n" +
                            "<button class=\"todo-edit-btn\"><i class=\"fas fa-edit\"></i></button>\n" +
                            "<button class=\"todo-quit\"><i class=\"fa fa-minus-circle\"></i></button>\n" +
                            "</li>";
            $(".todo-task-list").append(taskHTML);
            $(this).val("")
            return true;
        }
    }
});

// function to remove tasks from list
$(".todo-task-list").on("click", ".todo-task .todo-quit", function(){
   $(this).parent().remove();
});

// function to mark tasks as complete/unmark them
$(".todo-task-list").on("click", ".todo-task .todo-checkbox", function(){

    if (this.checked){
        $(this).parent().find("span").addClass("todo-done");
        $(this).parent().parent().addClass("list-group-item-light todo-completed").removeClass("todo-active");
    }else {
        $(this).parent().find("span").removeClass("todo-done");
        $(this).parent().parent().addClass("todo-active").removeClass("list-group-item-light todo-completed");
    }

});

// function to edit tasks
$(".todo-task-list").on("click", ".todo-task .todo-edit-btn", function(){
    let taskParent = $(this).parent();
    taskParent.find(".todo-checkbox").prop("disabled", true);
    taskParent.find(".todo-edit-btn").prop("disabled", true);
    let spanText = taskParent.find("span").text();
    taskParent.find("span").hide();
    taskParent.find(".todo-checkbox").after("<input type=\"text\" " +
                                                    "class=\"todo-edit text-secondary\" " +
                                                    " autofocus >")
    taskParent.find(".todo-edit").focus().val(spanText);
});


// function to set make edit permanent
$(".todo-task-list").on("keypress focusout", ".todo-task .todo-edit", function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13 || e.type === "focusout"){
        let taskParent = $(this).parent().parent();
        let editValue = $(this).val();
        taskParent.find("span").text(editValue).show();
        $(this).remove();
        taskParent.find(".todo-checkbox").prop("disabled", false);
        taskParent.find(".todo-edit-btn").prop("disabled", false);
        return true;
    }
});

// function to view all, completed, or active tasks
$("#todo-show-all").click(function(){
    $(".todo-task").prop("hidden", false);
});

$("#todo-show-active").click(function(){
    $(".todo-completed").prop("hidden", true)
    $(".todo-active").prop("hidden", false)
});

$("#todo-show-completed").click(function(){
    $(".todo-completed").prop("hidden", false);
    $(".todo-active").prop("hidden", true);
});