package com.lti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lti.dto.Login;
import com.lti.dto.LoginStatus;
import com.lti.dto.RegisterStatus;
import com.lti.dto.ReportCompKey;
import com.lti.dto.Status.StatusType;
import com.lti.dto.SubmitResponse;
import com.lti.entity.Reports;
import com.lti.entity.UserDetails;
import com.lti.exception.UserServiceException;
import com.lti.service.ReportsDaoImpl;
import com.lti.service.UserServiceImpl;

@RestController
@RequestMapping("/user-restapi")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private ReportsDaoImpl reportsDao;

	@Autowired
	private UserServiceImpl userService;
	
	@Autowired
	private MailSender mailSender;

	@PostMapping("/register")
	public RegisterStatus register(@RequestBody UserDetails user) {
		try {
			int id = userService.register(user);
			RegisterStatus status = new RegisterStatus();
			status.setStatus(StatusType.SUCCESS);
			status.setMessage("Registration Successful!");
			status.setRegisteredCustomerId(id);
			return status;
		} catch (UserServiceException e) {
			RegisterStatus status = new RegisterStatus();
			status.setStatus(StatusType.FAILED);
			status.setMessage(e.getMessage());
			return status;
		}
	}

	@PostMapping("/login")
	public LoginStatus login(@RequestBody Login login) {
		try {
			UserDetails user = userService.login(login.getEmail(),login.getPassword());
			System.out.println(user);
			LoginStatus status = new LoginStatus();
			status.setStatus(StatusType.SUCCESS);
			status.setMessage("Login Successful!");
			status.setUserId(user.getUser_id());
			return status;
		} catch (UserServiceException e) {
			LoginStatus status = new LoginStatus();
			status.setStatus(StatusType.FAILED);
			status.setMessage(e.getMessage());
			return status;
			
		}
	}

	@GetMapping("/exam_selection/{course_id}/{user_id}")
	public boolean examSelection(@PathVariable("course_id") int course_id, @PathVariable("user_id") int user_id) {

		ReportCompKey rck = new ReportCompKey(user_id, course_id);
		boolean reportExists = reportsDao.reportExists(rck);
		return reportExists;

	}
	
	@PostMapping("/submit_answers")
	public String getUserResponse(@RequestBody SubmitResponse submitResponse) {
		userService.savingMarks(submitResponse);
		if(submitResponse.getLevelId() == 1 && submitResponse.getMarks() >= 50) {
			return "Pass";}
			else {
			return "Fail";
		}
	}


	
	@GetMapping("/report/{user_id}")
	public List<Reports> getUserReports(@PathVariable String user_id) {
		List<Reports> list = userService.generateUserReports(Integer.parseInt(user_id));
		return list;
	}
}
