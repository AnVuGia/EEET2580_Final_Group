package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;
import com.example.EEET2580_Group.Repository.CapstoneProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CapstoneProjectImp implements CapstoneProjectService {
    @Autowired
    private CapstoneProjectRepository capstoneProjectRepository;

    @Override
    public CapstoneProjectService saveCapstoneProject(CapstoneProjectResponse capstoneProject) {
        capstoneProjectRepository
                .save(new CapstoneProject(capstoneProject.getName(), capstoneProject.getDescription()));
        System.out.println("CapstoneProject saved");
        System.out.println(capstoneProject);
        return null;
    }

    @Override
    public List<CapstoneProject> getAllCapstoneProject() {
        System.out.println("CapstoneProject found");
        return List.of((CapstoneProject) capstoneProjectRepository.findAll());
    }

    @Override
    public Optional<CapstoneProject> findById(Long id) {
        System.out.println("CapstoneProject found");
        CapstoneProject capstoneProject = capstoneProjectRepository.findById(id).get();
        if (capstoneProject.getId() != null)
            return Optional.of(capstoneProject);
        return Optional.empty();
    }

    @Override
    public void deleteCapstoneProjectById(Long id) {
        capstoneProjectRepository.deleteById(id);
        System.out.println("CapstoneProject deleted");
    }

    @Override
    public Page<CapstoneProject> findPaginated(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return this.capstoneProjectRepository.findAll(pageable);
    }

    @Override
    public void updateCapstoneProjectById(Long id, CapstoneProjectResponse capstoneProject) {
        CapstoneProject capstoneProject1 = capstoneProjectRepository.findById(id).get();
        capstoneProject1.setName(capstoneProject.getName());
        capstoneProject1.setDescription(capstoneProject.getDescription());
        capstoneProjectRepository.save(capstoneProject1);
        System.out.println("CapstoneProject updated");
    }
}
