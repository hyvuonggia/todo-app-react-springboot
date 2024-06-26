package com.in28minutes.rest.webservices.restfulwebservices.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.in28minutes.rest.webservices.restfulwebservices.todo.entity.Todo;


@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {

	public List<Todo> findByUsername(String username);

	
}
