var express = require("express");
var db      = require("../models");
var helpers = require("../service/todos");
var router  = express.Router();

router.route("/")
  .get(helpers.getTodos)
  .post(helpers.createTodo)

  

router.route("/:todoId")
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)


  module.exports = router;