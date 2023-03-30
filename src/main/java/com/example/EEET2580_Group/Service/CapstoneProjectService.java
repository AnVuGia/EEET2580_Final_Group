package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.Entity.CapstoneProject;

import java.util.List;
import java.util.Optional;

public interface CapstoneProjectService {
    CapstoneProjectService saveCapstoneProject(CapstoneProject capstoneProject);
    List<CapstoneProjectService> getAllCapstoneProject();
    Optional<CapstoneProjectService> findById(Long id);
    void deleteCapstoneProjectById(Long id);

}
