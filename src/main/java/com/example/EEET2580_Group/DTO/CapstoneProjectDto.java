package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Lombok annotations
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CapstoneProjectDto {
    // CapstoneProjectDto Entity for the capstone project (unfinished)
    private Long id;
    private CompanyAccDto company;
    private AccountDto supervisor;
    private String projectTitle;
    private String projectIntroduction;
    private String projectObjectives;
    private String projectSuccessCriteria;
    private String technicalRequirements;
    private String projectDescription;
    private String academicBackground;
    private int noStudents;
    private String interviewReqs;
    private Boolean multiTeamAllow;
    private String capstoneStatus;
    private String capstoneColor;

    private Long imageId;
    public CapstoneProjectDto(CapstoneProject capstoneProject){
        this.id = capstoneProject.getId();
        this.company = new CompanyAccDto(capstoneProject.getCompany());
        this.supervisor = new AccountDto(capstoneProject.getSupervisor());
        this.projectTitle = capstoneProject.getProjectTitle();
        this.projectIntroduction = capstoneProject.getProjectIntroduction();
        this.projectObjectives = capstoneProject.getProjectObjectives();
        this.projectSuccessCriteria = capstoneProject.getProjectSuccessCriteria();
        this.technicalRequirements = capstoneProject.getTechnicalRequirements();
        this.projectDescription = capstoneProject.getProjectDescription();
        this.academicBackground = capstoneProject.getAcademicBackground();
        this.noStudents = capstoneProject.getNoStudents();
        this.interviewReqs = capstoneProject.getInterviewReqs();
        this.multiTeamAllow = capstoneProject.getMultiTeamAllow();
        this.capstoneStatus = capstoneProject.getCapstoneStatus();
        this.capstoneColor = capstoneProject.getCapstoneColor();
        this.imageId = capstoneProject.getImageId();
    }
}
