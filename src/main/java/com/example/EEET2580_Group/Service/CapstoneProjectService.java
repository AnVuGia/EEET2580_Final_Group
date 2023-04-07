package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CapstoneProjectService {
    // saveCapstoneProject saves a capstone project
    CapstoneProjectService saveCapstoneProject(CapstoneProjectResponse capstoneProject);

    // getAllCapstoneProject returns all capstone projects to a list
    List<CapstoneProject> getAllCapstoneProject();

    // findById returns a capstone project by id
    Optional<CapstoneProject> findById(Long id);

    // deleteCapstoneProjectById deletes a capstone project by id
    void deleteCapstoneProjectById(Long id);

    // updateCapstoneProjectById updates a capstone project by id
    void updateCapstoneProjectById(Long id, CapstoneProjectResponse capstoneProject);

    // findPaginated returns a page of capstone projects with pagination
    public Page<CapstoneProject> findPaginated(Pageable pageable);

}
