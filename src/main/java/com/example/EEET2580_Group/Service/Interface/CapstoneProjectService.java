package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Entity.CapstoneProject;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface CapstoneProjectService {
    // saveCapstoneProject saves a capstone project
    void saveCapstoneProject(CapstoneProjectDto capstoneProject);

    // getAllCapstoneProject returns all capstone projects to a list
    List<CapstoneProject> getAllCapstoneProject();

    // findById returns a capstone project by id
    Optional<CapstoneProject> findById(Long id);

    // deleteCapstoneProjectById deletes a capstone project by id
    void deleteCapstoneProjectById(Long id);

    // updateCapstoneProjectById updates a capstone project by id
    void updateCapstoneProjectById(Long id, CapstoneProjectDto capstoneProject);

    // findPaginated returns a page of capstone projects with pagination
    public Page<CapstoneProject> findPaginated(Pageable pageable);

    Optional<CapstoneProject> findByTitle(String title);

    List<CapstoneProject> findAllProjectByCompanyName(String companyName);

}
