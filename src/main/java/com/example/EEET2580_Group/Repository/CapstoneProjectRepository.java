package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CapstoneProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
// CapstoneProjectRepository is a JPA repository
public interface CapstoneProjectRepository extends JpaRepository<CapstoneProject, Long> {
    // Find all capstone projects and return a page with pagination
    Page<CapstoneProject> findAll(Pageable pageable);
    <Optional> CapstoneProject findByProjectTitle(String title);
    @Query("SELECT c FROM CapstoneProject c WHERE c.company.companyName = :company_name")
    List<CapstoneProject> findAllProjectByCompanyName(@Param(value = "company_name") String company_name);

}
