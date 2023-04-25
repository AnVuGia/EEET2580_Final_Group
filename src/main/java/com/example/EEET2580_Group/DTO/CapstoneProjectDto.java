package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Lombok annotations
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CapstoneProjectDto {
    // CapstoneProjectDto Entity for the capstone project (unfinished)
    private CompanyAcc company;
    private Long adminId;

    private SupervisorAcc supervisor;
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
    public void setCapstoneProjectResponse(CapstoneProject capstoneProject){
        this.company = capstoneProject.getCompany();
        this.adminId = capstoneProject.getAdminId();
        this.supervisor = capstoneProject.getSupervisor();
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
    }
}
