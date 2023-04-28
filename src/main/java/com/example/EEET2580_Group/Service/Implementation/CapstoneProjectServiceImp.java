package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Repository.CapstoneProjectRepository;

import com.example.EEET2580_Group.Repository.CompanyAccRepository;
import com.example.EEET2580_Group.Repository.SupervisorAccRepository;
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
    @Autowired
    private SupervisorAccRepository supervisorAccRepository;

    @Override
    public void saveCapstoneProject(CapstoneProjectDto capstoneProjectDto) {

        CompanyAcc companyAcc = companyAccRepository.findById(capstoneProjectDto.getCompany().getId()).get();
        SupervisorAcc supervisorAcc = supervisorAccRepository.findById(capstoneProjectDto.getSupervisor().getId()).get();
        capstoneProjectDto.setCompany(companyAcc);
        capstoneProjectDto.setSupervisor(supervisorAcc);
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
    public Page<CapstoneProject> findByCompanyName(String companyName,Pageable pageable) {
        return capstoneProjectRepository.findByCompanyName(companyName, pageable);
    }

    @Override
    public Page<CapstoneProject> findBySupervisorName(String supervisorName,Pageable pageable) {
        System.out.println(supervisorName);
        return capstoneProjectRepository.findBySupervisorName(supervisorName, pageable);
    }

    @Override
    public Page<CapstoneProject> filterAll(String capstoneName, String companyName,String supervisorName, Pageable page){

        if (!capstoneName.isEmpty() && !companyName.isEmpty() && !supervisorName.isEmpty()) {
            System.out.println(1);
            return capstoneProjectRepository.filterAll(capstoneName, companyName, supervisorName, page);
        }else if (!capstoneName.isEmpty() &&!companyName.isEmpty()){
            System.out.println(2);
            return capstoneProjectRepository.findByCapstoneNameAndCompanyName(capstoneName,companyName,page);
        }else if (!companyName.isEmpty() &&!supervisorName.isEmpty()){
            System.out.println(3);
            return capstoneProjectRepository.findByCompanyNameAndSupervisorName(companyName,supervisorName,page);
        }else if (!capstoneName.isEmpty() &&!supervisorName.isEmpty()){
            System.out.println(4);
            return capstoneProjectRepository.findByCapstoneNameAndSupervisorName(capstoneName,supervisorName,page);
        }else if (!capstoneName.isEmpty() ) {
            System.out.println("find capstoneName only");
            return capstoneProjectRepository.findByCapstoneName(capstoneName, page);
        }else if (!companyName.isEmpty()){
            System.out.println("find companyName only");
            return capstoneProjectRepository.findByCompanyName(companyName,page);
        }else if (!supervisorName.isEmpty()){
            System.out.println("find supervisorName only");
            return capstoneProjectRepository.findBySupervisorName(supervisorName,page);
        }
        return null;
    }



    @Override
    public List<CapstoneProject> findAllProjectByCompanyName(String companyName) {
//        CompanyAcc temp = companyAccRepository.findByCompanyName(companyName);
//        System.out.println(temp.getCompanyName());
        return capstoneProjectRepository.findAllProjectByCompanyName(companyName);
    }
}
