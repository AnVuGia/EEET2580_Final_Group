package com.example.EEET2580_Group.Entity;
import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Utils.Utility;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Lombok annotations
@Data
@NoArgsConstructor
@AllArgsConstructor
// JPA annotations
@Entity
@Table(name = "capstone-project")
public class CapstoneProject {
    // CapstoneProject Entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonBackReference
    private CompanyAcc company;

    @Column(name = "admin_id")
    private Long adminId;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    @JsonBackReference
    private SupervisorAcc supervisor;

    @Column(name = "project_title")
    private String projectTitle;

    @Column(name = "project_introduction")
    private String projectIntroduction;

    @Column(name = "project_objectives")
    private String projectObjectives;

    @Column(name = "project_success_criteria")
    private String projectSuccessCriteria;

    @Column(name = "technical_requirements")
    private String technicalRequirements;

    @Column(name = "project_description")
    private String projectDescription;

    @Column(name = "academic_background")
    private String academicBackground;

    @Column(name = "no_students")
    private int noStudents;

    @Column(name = "interview_reqs")
    private String interviewReqs;

    @Column(name = "multi_team_allow")
    private Boolean multiTeamAllow;

    @Column(name = "capstone_color")
    private String capstoneColor;

    public void setCapstoneProject(CapstoneProjectDto capstoneProjectDto) {
        this.company = capstoneProjectDto.getCompany();
        this.adminId = capstoneProjectDto.getAdminId();
        this.supervisor = capstoneProjectDto.getSupervisor();
        this.projectTitle = capstoneProjectDto.getProjectTitle();
        this.projectIntroduction = capstoneProjectDto.getProjectIntroduction();
        this.projectObjectives = capstoneProjectDto.getProjectObjectives();
        this.projectSuccessCriteria = capstoneProjectDto.getProjectSuccessCriteria();
        this.technicalRequirements = capstoneProjectDto.getTechnicalRequirements();
        this.projectDescription = capstoneProjectDto.getProjectDescription();
        this.academicBackground = capstoneProjectDto.getAcademicBackground();
        this.noStudents = capstoneProjectDto.getNoStudents();
        this.interviewReqs = capstoneProjectDto.getInterviewReqs();
        this.multiTeamAllow = capstoneProjectDto.getMultiTeamAllow();
        this.capstoneColor = Utility.returnColor();
    }

}
