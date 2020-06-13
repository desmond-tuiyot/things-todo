// function to append new task to list
$(".todo-input").keypress(function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13){
        let nextTask = $(this).val();
        $(this).val("");
        if (nextTask===""){
            return false;
        } else {
            let dt = new Date();
            let currentDate = "Created: " + dt.toLocaleDateString();
            let key = storeTasks(nextTask, dt);
            // alert(key);
            let taskHTML = "<li class=\"list-group-item todo-task todo-active p-1\" id=\""+ key +"\">\n" +
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
                "                    <p id=\"date-created\" class=\"small text-left text-secondary\">"+ currentDate +"</p>\n"+
                "                </li>"
            $(".todo-task-list").append(taskHTML);
            $(this).val("");
            // add current date

            return true;
        }
    }

});

// function to remove tasks from list
$(".todo-task-list").on("click", ".todo-task .todo-quit", function(){
   let li = $(this).parent().parent().parent();
   alert(li.attr("id"));
   removeTasks(li.attr("id"));
   li.remove();
});

// function to mark tasks as complete/unmark them
$(".todo-task-list").on("click", ".todo-task .todo-checkbox", function(){

    if (this.checked){
        $(this).parent().find(".todo-text").addClass("todo-done");
        $(this).parent().parent().parent().parent().addClass("list-group-item-light todo-completed").removeClass("todo-active");
    }else {
        $(this).parent().find(".todo-text").removeClass("todo-done");
        $(this).parent().parent().parent().parent().addClass("todo-active").removeClass("list-group-item-light todo-completed");
    }

});

// function to edit tasks
$(".todo-task-list").on("click", ".todo-task .todo-edit-btn", function(){
    let taskParent = $(this).parent().parent();
    taskParent.find(".todo-checkbox").prop("disabled", true);
    taskParent.find(".todo-edit-btn").prop("disabled", true);
    let pText = taskParent.find(".todo-text").text();
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

        taskParent.find(".todo-text").text(editValue).show();
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

// function to store data in localStorage
let storeTasks = function(todoTask, date){
    let order = localStorage.getItem('order');
    // creates an array if its not in already
    order = order === null ? Array() : JSON.parse(order);

    // create a random value to act as key in localStorage and as id in li element
    let key = date.valueOf().toString() + Math.random().toString();
    while (order.includes(key)){
        key = date.valueOf().toString() + Math.random().toString();
    }
    // create a JSON object to hold the task and date of task currently being added
    let todoData = {
        task: todoTask,
        date: date.toLocaleDateString()
    };
    // store the key-value pair in localStorage
    window.localStorage.setItem(key, JSON.stringify(todoData));

    // append the key to order array
    order.push(key);
    // store that in local storage
    window.localStorage.setItem('order', JSON.stringify(order))
    return key;
}

// function to remove stored data from localStorage
let removeTasks = function(key){
    // remove data associated with key
    localStorage.removeItem(key);

    // remove key from order array
    let order = JSON.parse(window.localStorage.getItem('order'));
    if (order === null) {
        return;
    }
    let new_order = [];
    for (let i=0; i<order.length; i++){
        if (order[i] !== key){
            new_order.push(order[i]);
        }
    }
    window.localStorage.setItem('order', JSON.stringify(new_order));
}


// add current date
let dt = new Date();
$("#date-created").text("Created: " + dt.toLocaleString());