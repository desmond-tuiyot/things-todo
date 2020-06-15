let todo_task_list = $(".todo-task-list");

// function to task li element
let constructTaskLi = function (task, dateCreated, id, done) {
    // these clases are dependent on whether the task was completed or no
    let todo_text_class = "";
    let todo_task_class = "";
    let checked = "";
    if (done){
        todo_text_class = "text-secondary todo-done";
        todo_task_class = "list-group-item-light todo-completed";
        checked = "checked";
    } else{
        todo_task_class = "todo-active";
    }

    return "<li class=\"list-group-item todo-task " + todo_task_class + " p-1\" id=\"" + id + "\">\n" +
        "                    <div class=\"p-2 row justify-content-between align-items-center no-gutters\">\n" +
        "                        <div class=\"col\">\n" +
        "                            <label class=\"todo-label\">\n" +
        "                                <input type=\"checkbox\" "+ checked +" class=\"todo-checkbox\">\n" +
        "                                <p class=\"todo-text "+ todo_text_class +" \">" + task + "</p>\n" +
        "                            </label>\n" +
        "                        </div>\n" +
        "                        <div class=\"col-2\">\n" +
        "                            <button class=\"todo-edit-btn\"><i class=\"fas fa-edit\"></i></button>\n" +
        "                            <button class=\"todo-quit\"><i class=\"fa fa-minus-circle\"></i></button>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <p id=\"date-created\" class=\"small text-left text-secondary\">Created: " + dateCreated + "</p>\n" +
        "                </li>"
}

// function to append existing localstorage tasks the list
let populateTaskList = function(){
    let order = JSON.parse(localStorage.getItem("order"));
    if (order === null){
        return
    }
    for (let i=0; i<order.length; i++){
        let key = order[i];
        let task = JSON.parse(localStorage.getItem(key));
        let li_html = constructTaskLi(task.task, task.date, key, task.done);
        todo_task_list.append(li_html);
    }
}

populateTaskList();

// function to append new task to list on click
$(".todo-input").keypress(function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13){
        let nextTask = $(this).val();
        $(this).val("");
        if (nextTask===""){
            return false;
        } else {
            let dt = new Date();
            let currentDate = dt.toLocaleString();
            let key = storeTasks(nextTask, dt);
            let taskHTML = constructTaskLi(nextTask, currentDate, key, false);
            todo_task_list.append(taskHTML);
            $(this).val("");
            return true;
        }
    }

});

// function to remove tasks from list
todo_task_list.on("click", ".todo-task .todo-quit", function(){
   let li = $(this).parent().parent().parent();
   removeTasks(li.attr("id"));
   li.remove();
});

// function to mark tasks as complete/unmark them
todo_task_list.on("click", ".todo-task .todo-checkbox", function(){
    let taskParent = $(this).parent().parent().parent().parent();
    if (this.checked){
        $(this).parent().find(".todo-text").addClass("text-secondary todo-done");
        taskParent.addClass("list-group-item-light todo-completed").removeClass("todo-active");
        editTasks(taskParent.attr("id"), true);
    }else {
        $(this).parent().find(".todo-text").removeClass("text-secondary todo-done");
        taskParent.addClass("todo-active").removeClass("list-group-item-light todo-completed");
        editTasks(taskParent.attr("id"), false);
    }

});

// function to edit tasks
todo_task_list.on("click", ".todo-task .todo-edit-btn", function(){
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
todo_task_list.on("keypress focusout", ".todo-task .todo-edit", function(e){
    let pressedKey = e.which || e.keyCode;
    if (pressedKey===13 || e.type === "focusout"){
        let taskParent = $(this).parent().parent().parent().parent();
        let editValue = $(this).val();

        if (editValue===""){
            taskParent.remove();
        return false;
    }
        // show the previously hidden text, now updated with new text
        taskParent.find(".todo-text").text(editValue).show();
        $(this).remove();

        // update task data in local storage
        editTasks(taskParent.attr("id"), editValue);

        // enable the buttons again
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
        date: date.toLocaleString(),
        done: false
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

// function to edit task details or to mark as completed
let editTasks = function(key, taskDetails){
    // get the corresponding task data
    let taskData = JSON.parse(window.localStorage.getItem(key));

    // could be a task being edited or being marked as complete
    if (typeof(taskDetails)==='string'){
        taskData.task = taskDetails;
    }else{
        taskData.done = taskDetails;
    }
    window.localStorage.setItem(key, JSON.stringify(taskData));
}

// add current date
let dt = new Date();
$("#date-created").text("Created: " + dt.toLocaleString());