package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Repository.CapstoneProjectRepository;

import com.example.EEET2580_Group.Repository.CompanyAccRepository;
import com.example.EEET2580_Group.Service.Interface.CapstoneProjectService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// service
@Service
@Transactional
// CapstoneProjectServiceImp implements CapstoneProjectService
public class CapstoneProjectServiceImp implements CapstoneProjectService {
    @Autowired
    private CapstoneProjectRepository capstoneProjectRepository;
    @Autowired
    private CompanyAccRepository companyAccRepository;

    @Override
    public void saveCapstoneProject(CapstoneProjectDto capstoneProjectDto) {

        CompanyAcc companyAcc = companyAccRepository.findById(capstoneProjectDto.getCompany().getId()).get();

        capstoneProjectDto.setCompany(companyAcc);
        CapstoneProject temCapstoneProject = new CapstoneProject();
        temCapstoneProject.setCapstoneProject(capstoneProjectDto);
        capstoneProjectRepository
                .save(temCapstoneProject);
        System.out.println("CapstoneProject saved");
    }

    @Override
    public List<CapstoneProject> getAllCapstoneProject() {
        System.out.println("CapstoneProject found");
        return capstoneProjectRepository.findAll();
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
    public Page<CapstoneProject> findPaginated(Pageable pageable) {
        Page<CapstoneProject> page = capstoneProjectRepository.findAll(pageable);
        return page;
    }

    @Override
    public void updateCapstoneProjectById(Long id, CapstoneProjectDto capstoneProjectDto) {
        CapstoneProject capstoneProject1 = capstoneProjectRepository.findById(id).get();

        capstoneProjectRepository.save(capstoneProject1);
        System.out.println("CapstoneProject updated");
    }

    @Override
    public Optional<CapstoneProject> findByTitle(String title) {
        CapstoneProject capstoneProject = capstoneProjectRepository.findByProjectTitle(title);
        if (capstoneProject.getProjectTitle() != null)
            return Optional.of(capstoneProject);
        return Optional.empty();
    }
    @Override
    public List<CapstoneProject> findAllProjectByCompanyName(String companyName) {
//        CompanyAcc temp = companyAccRepository.findByCompanyName(companyName);
//        System.out.println(temp.getCompanyName());
        return capstoneProjectRepository.findAllProjectByCompanyName(companyName);
    }
}
