package com.lti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lti.dto.ReportCompKey;
import com.lti.entity.Reports;

@Repository
public interface ReportsDao extends JpaRepository<Reports, ReportCompKey> {
	

}
