package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.Account;
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

    public CapstoneProject createCapstoneEntity(CapstoneProjectDto capstoneProject){
        CompanyAcc companyAcc = companyAccRepository.findByUsername(capstoneProject.getCompany().getUsername());
        SupervisorAcc superVisorAcc = supervisorAccRepository.findByUsername(capstoneProject.getSupervisor().getUsername());

        return new CapstoneProject(companyAcc,
                                    superVisorAcc,
                                    capstoneProject.getProjectTitle(),
                                    capstoneProject.getProjectIntroduction(),
                                    capstoneProject.getProjectObjectives(),
                                    capstoneProject.getProjectSuccessCriteria(),
                                    capstoneProject.getTechnicalRequirements(),
                                    capstoneProject.getProjectDescription(),
                                    capstoneProject.getAcademicBackground(),
                                    capstoneProject.getNoStudents(),
                                    capstoneProject.getInterviewReqs(),
                                    capstoneProject.getMultiTeamAllow(),
                                    capstoneProject.getCapstoneStatus(),
                                    capstoneProject.getImageId());
    }

    public void updateCapstone(CapstoneProject oldCapstone, CapstoneProjectDto newCapstone){
        System.out.println("Inside update capstone");
        //CompanyAcc companyAcc = companyAccRepository.findByUsername(newCapstone.getCompany().getUsername());
        //SupervisorAcc superVisorAcc = supervisorAccRepository.findByUsername(newCapstone.getSupervisor().getUsername());
        //oldCapstone.setCompany(companyAcc);
        //oldCapstone.setSupervisor(superVisorAcc);
        oldCapstone.setProjectTitle(newCapstone.getProjectTitle());
        oldCapstone.setProjectIntroduction(newCapstone.getProjectIntroduction());
        oldCapstone.setProjectObjectives(newCapstone.getProjectObjectives());
        oldCapstone.setProjectSuccessCriteria(newCapstone.getProjectSuccessCriteria());
        oldCapstone.setTechnicalRequirements(newCapstone.getTechnicalRequirements());
        oldCapstone.setProjectDescription(newCapstone.getProjectDescription());
        oldCapstone.setAcademicBackground(newCapstone.getAcademicBackground());
        oldCapstone.setNoStudents(newCapstone.getNoStudents());
        oldCapstone.setInterviewReqs(newCapstone.getInterviewReqs());
        oldCapstone.setMultiTeamAllow(newCapstone.getMultiTeamAllow());
        oldCapstone.setCapstoneStatus(newCapstone.getCapstoneStatus());
        oldCapstone.setImageId(newCapstone.getImageId());
    }

    @Override
    public void saveCapstoneProject(CapstoneProjectDto capstoneProjectDto) {
        capstoneProjectRepository
                .save(createCapstoneEntity(capstoneProjectDto));
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
        Page<CapstoneProject> page = capstoneProjectRepository.findByStatus("approved",pageable);
        return page;
    }

    @Override
    public void updateCapstoneProjectById(Long id, CapstoneProjectDto capstoneProjectDto) {
        CapstoneProject capstoneToUpdate = capstoneProjectRepository.findById(id).get();
        this.updateCapstone(capstoneToUpdate,capstoneProjectDto);
        capstoneProjectRepository.save(capstoneToUpdate);
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
        return capstoneProjectRepository.findByCompanyName(companyName, "approved",pageable);
    }

    @Override
    public Page<CapstoneProject> findBySupervisorName(String supervisorName,String status, Pageable pageable) {
        System.out.println(supervisorName);
        return capstoneProjectRepository.findBySupervisorName(supervisorName, status, pageable);
    }

    @Override
    public Page<CapstoneProject> filterAll(String capstoneName, String companyName,String supervisorName, Pageable page){

        if (!capstoneName.isEmpty() && !companyName.isEmpty() && !supervisorName.isEmpty()) {
            System.out.println(1);
            return capstoneProjectRepository.filterAll(capstoneName, companyName, supervisorName,"approved", page);
        }else if (!capstoneName.isEmpty() &&!companyName.isEmpty()){
            System.out.println(2);
            return capstoneProjectRepository.findByCapstoneNameAndCompanyName(capstoneName,companyName,"approved",page);
        }else if (!companyName.isEmpty() &&!supervisorName.isEmpty()){
            System.out.println(3);
            return capstoneProjectRepository.findByCompanyNameAndSupervisorName(companyName,supervisorName, "approved",page);
        }else if (!capstoneName.isEmpty() &&!supervisorName.isEmpty()){
            System.out.println(4);
            return capstoneProjectRepository.findByCapstoneNameAndSupervisorName(capstoneName,supervisorName, "approved",page);
        }else if (!capstoneName.isEmpty() ) {
            System.out.println("find capstoneName only");
            return capstoneProjectRepository.findByCapstoneName(capstoneName,"approved", page);
        }else if (!companyName.isEmpty()){
            System.out.println("find companyName only");
            return capstoneProjectRepository.findByCompanyName(companyName,"approved",page);
        }else if (!supervisorName.isEmpty()){
            System.out.println("find supervisorName only");
            return capstoneProjectRepository.findBySupervisorName(supervisorName,"approved",page);
        }
        return null;
    }


    @Override
    public List<CapstoneProject> findAllProjectByCompanyName(String companyName, String status) {
        return capstoneProjectRepository.findAllProjectByCompanyName(companyName,status);
    }



    @Override
    public Page<CapstoneProject> findAllPendingCapstone(Pageable pageable){
        return capstoneProjectRepository.findByStatus("pending",pageable);
    }

    @Override
    public Page<CapstoneProject> findAllApprovedCapstone(Pageable pageable){
        return capstoneProjectRepository.findByStatus("approved",pageable);
    }

    @Override
    public Page<CapstoneProject> findAllRejectedCapstone(Pageable pageable){
        return capstoneProjectRepository.findByStatus("rejected",pageable);
    }

       @Override
    public Page<CapstoneProject> findAllPendingCapstoneByCompanyName(String companyName,Pageable pageable) {
           return capstoneProjectRepository.findByCompanyNameAndStatus(companyName, "pending", pageable);
       }
       @Override
    public Page<CapstoneProject> findAllApprovedCapstoneByCompanyName(String companyName,Pageable pageable) {
             return capstoneProjectRepository.findByCompanyNameAndStatus(companyName, "approved", pageable);
         }

           @Override
    public Page<CapstoneProject> findAllRejectedCapstoneByCompanyName(String companyName,Pageable pageable) {
               return capstoneProjectRepository.findByCompanyNameAndStatus(companyName, "rejected", pageable);
           }

    @Override
    public Page<CapstoneProject> findAllByCapstoneStatus(String status, Pageable pageable) {
        return capstoneProjectRepository.findByStatus(status,pageable);
    }

}
