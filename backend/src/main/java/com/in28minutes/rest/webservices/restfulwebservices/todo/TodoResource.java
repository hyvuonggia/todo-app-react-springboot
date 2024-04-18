package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.rest.webservices.restfulwebservices.todo.entity.Todo;
import com.in28minutes.rest.webservices.restfulwebservices.todo.service.TodoService;

//@RestController
public class TodoResource {

	private TodoService todoService;

	@Autowired
	public TodoResource(TodoService todoService) {
		this.todoService = todoService;
	}

	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}

	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable int id) {
		return todoService.findById(id);
	}
	 
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id){
		todoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable int id, @RequestBody Todo todo){
		todoService.updateTodo(todo);
		return ResponseEntity.ok(todo);
	}
	
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(@PathVariable String username, @RequestBody Todo todo){
		Todo createdTodo = todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
		return ResponseEntity.ok(createdTodo);
	}
}
