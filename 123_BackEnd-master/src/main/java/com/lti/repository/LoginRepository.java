package com.lti.repository;

import org.springframework.data.repository.Repository;
import com.lti.entity.UserDetails;

public interface LoginRepository extends Repository<UserDetails, Integer> {
	
	public UserDetails findByEmailAndPassword(String email,String password);

	public UserDetails findByEmail(String email);

}
