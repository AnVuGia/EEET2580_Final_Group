package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CapstoneProjectService {
    CapstoneProjectService saveCapstoneProject(CapstoneProjectResponse capstoneProject);

    List<CapstoneProject> getAllCapstoneProject();

    Optional<CapstoneProject> findById(Long id);

    void deleteCapstoneProjectById(Long id);

    void updateCapstoneProjectById(Long id, CapstoneProjectResponse capstoneProject);

    public Page<CapstoneProject> findPaginated(int pageNo, int pageSize);

}
