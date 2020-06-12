// function to append new task to list
$(".todo-input").keypress(function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13){
        let nextTask = $(this).val();
        $(this).val("");
        if (nextTask===""){
            return false;
        } else {
            let taskHTML = "<li class=\"list-group-item todo-task todo-active p-1\">\n" +
                "                    <div class=\"p-2 row justify-content-between align-items-center no-gutters\">\n" +
                "                        <div class=\"col\">\n" +
                "                            <label class=\"todo-label\">\n" +
                "                                <input type=\"checkbox\" class=\"todo-checkbox\">\n" +
                "                                <p class=\"todo-text\">"+ nextTask +"</p>\n" +
                "                            </label>\n" +
                "                        </div>\n" +
                "                        <div class=\"col-2\">\n" +
                "                            <button class=\"todo-edit-btn\"><i class=\"fas fa-edit\"></i></button>\n" +
                "                            <button class=\"todo-quit\"><i class=\"fa fa-minus-circle\"></i></button>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </li>"
            $(".todo-task-list").append(taskHTML);
            $(this).val("")
            return true;
        }
    }
});

// function to remove tasks from list
$(".todo-task-list").on("click", ".todo-task .todo-quit", function(){
   $(this).parent().parent().parent().remove();
});

// function to mark tasks as complete/unmark them
$(".todo-task-list").on("click", ".todo-task .todo-checkbox", function(){

    if (this.checked){
        $(this).parent().find("p").addClass("todo-done");
        $(this).parent().parent().parent().parent().addClass("list-group-item-light todo-completed").removeClass("todo-active");
    }else {
        $(this).parent().find("p").removeClass("todo-done");
        $(this).parent().parent().parent().parent().addClass("todo-active").removeClass("list-group-item-light todo-completed");
    }

});

// function to edit tasks
$(".todo-task-list").on("click", ".todo-task .todo-edit-btn", function(){
    let taskParent = $(this).parent().parent();
    taskParent.find(".todo-checkbox").prop("disabled", true);
    taskParent.find(".todo-edit-btn").prop("disabled", true);
    let pText = taskParent.find("p").text();
    taskParent.find("p").hide();
    taskParent.find(".todo-checkbox").after("<input type=\"text\" " +
                                                    "class=\"todo-text todo-edit text-secondary\" " +
                                                    " autofocus >")
    taskParent.find(".todo-edit").focus().val(pText);
});


// function to set make edit permanent
$(".todo-task-list").on("keypress focusout", ".todo-task .todo-edit", function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13 || e.type === "focusout"){
        let taskParent = $(this).parent().parent().parent().parent();
        let editValue = $(this).val();

        if (editValue===""){
            taskParent.remove();
        return false;
    }

        taskParent.find("p").text(editValue).show();
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