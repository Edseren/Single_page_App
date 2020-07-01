// import { updateTodo } from "../heplers/todos";


// this function starts the first page load
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $("#todoInput").keypress(function(event){
        if(event.which == 13) {
            createTodo();
        }
    });

    $(".list").on("click", "li", function(){
        updateTodo($(this));
    })


// has to add click listener to parent clas list as well
    $(".list").on("click", "span", function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
        // var clickedId = $(this).parent().data("id");
        // var deleteUrl = "/api/todos/" + clickedId;
        // $(this).parent().remove();
        // $.ajax({
        //     method: "DELETE",
        //     url: deleteUrl
        // })
        // .then(function(data){
        //     console.log(data);
        // });
    })
});

function addTodos(todos){
    //add todos to page here
    todos.forEach(function(todo){
        addTodo(todo);
    //     var newTodo = $("<li class='task'>"+todo.name+"</li>");
    //     if(todo.completed){
    //         newTodo.addClass("done");
    //     }
    //     $(".list").append(newTodo);
    });
}


function addTodo(todo){
    var newTodo = $("<li class='task'>"+todo.name+" <span>x</span></li>");
    // find ._id in mongoose
    newTodo.data("id", todo._id); 
    newTodo.data("completed", todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
}
    $(".list").append(newTodo);
}


function createTodo(){
    //send request tocreate new todo
    var usrInput = $("#todoInput").val();
    $.post("/api/todos",{name: usrInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    })
}


function removeTodo(todo){
    var clickedId = todo.data("id");
    var deleteUrl = "/api/todos/" + clickedId;
          $.ajax({
              method: "DELETE",
              url: deleteUrl
          })
          .then(function(data){
              todo.remove();
          })
          .catch(function(err){
              console.log(err);
          });
}

// updating the boolian class
function updateTodo(todo){
    var updateUrl  = "/api/todos/" + todo.data("id");
    var isDone     = !todo.data("completed");
    var updateData = {completed: isDone}
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    });
}