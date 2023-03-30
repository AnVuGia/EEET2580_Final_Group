package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CapstoneProjectService {
    CapstoneProjectService saveCapstoneProject(CapstoneProject capstoneProject);
    List<CapstoneProject> getAllCapstoneProject();
    Optional<CapstoneProject> findById(Long id);
    void deleteCapstoneProjectById(Long id);
    public Page<CapstoneProject> findPaginated(int pageNo, int pageSize);

}
