package com.in28minutes.rest.webservices.restfulwebservices.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

//@Configuration
public class BasicAuthenticationSecurityConfiguration {

	// Filter chain
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		// authenticate all requests
		RequestMatcher optionsMatcher = new AntPathRequestMatcher("/**", HttpMethod.OPTIONS.toString());
	    http.authorizeHttpRequests(auth -> auth
	            .requestMatchers(optionsMatcher).permitAll()
	            .requestMatchers(new AntPathRequestMatcher("/**")).authenticated());
		
		// basic authentication
		http.httpBasic(Customizer.withDefaults());
		
		// stateless rest api
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		// disabling csrf
		http.csrf().disable();
		
		return http.build();
	}
}
