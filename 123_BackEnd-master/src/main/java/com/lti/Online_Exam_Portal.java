package com.lti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication(scanBasePackages="com.lti")
public class Online_Exam_Portal {

	@CrossOrigin("/http://localhost:4200")
	public static void main(String[] args) {
		SpringApplication.run(Online_Exam_Portal.class, args);
	}

}
