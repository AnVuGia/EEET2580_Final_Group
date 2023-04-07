package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CapstoneProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// CapstoneProjectRepository is a JPA repository
public interface CapstoneProjectRepository extends JpaRepository<CapstoneProject, Long> {
    // Find all capstone projects and return a page with pagination
    Page<CapstoneProject> findAll(Pageable pageable);
}
