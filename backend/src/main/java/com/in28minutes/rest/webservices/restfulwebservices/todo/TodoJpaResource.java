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
import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;
import com.in28minutes.rest.webservices.restfulwebservices.todo.service.TodoService;

@RestController
public class TodoJpaResource {

	private TodoService todoService;
	private TodoRepository todoRepository;

	@Autowired
	public TodoJpaResource(TodoService todoService, TodoRepository todoRepository) {
		this.todoService = todoService;
		this.todoRepository = todoRepository;
	}

	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoRepository.findByUsername(username);
	}

	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable int id) {
		return todoRepository.findById(id).get();
	}
	 
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id){
		todoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
		
	}
	
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable int id, @RequestBody Todo todo){
		todoRepository.save(todo);
		return ResponseEntity.ok(todo);
	}
	
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(@PathVariable String username, @RequestBody Todo todo){
		todo.setUsername(username);
		todo.setId(null);
		todoRepository.save(todo);
		return ResponseEntity.ok(todo);
	}
}
