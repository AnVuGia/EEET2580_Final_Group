package com.example.EEET2580_Group.Service;

import com.example.EEET2580_Group.DAO.CapstoneProjectRepository;
import com.example.EEET2580_Group.Entity.CapstoneProject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CapstoneProjectImp implements CapstoneProjectService{
    @Autowired
    private CapstoneProjectRepository capstoneProjectRepository;
    @Override
    public CapstoneProjectService saveCapstoneProject(CapstoneProject capstoneProject) {
        capstoneProjectRepository.save((CapstoneProject) capstoneProject);
        System.out.println("CapstoneProject saved");
        System.out.println(capstoneProject);
        return null;
    }

    @Override
    public List<CapstoneProjectService> getAllCapstoneProject() {
        System.out.println("CapstoneProject found");
        System.out.println(capstoneProjectRepository.findAll());
        return null;
    }

    @Override
    public Optional<CapstoneProjectService> findById(Long id) {
        System.out.println("CapstoneProject found");
        System.out.println(capstoneProjectRepository.findById(id));
        return Optional.empty();
    }

    @Override
    public void deleteCapstoneProjectById(Long id) {
        capstoneProjectRepository.deleteById(id);
        System.out.println("CapstoneProject deleted");
    }
}
