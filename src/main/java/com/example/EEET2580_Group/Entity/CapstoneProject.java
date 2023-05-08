package com.example.EEET2580_Group.Entity;
import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Repository.SupervisorAccRepository;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import com.example.EEET2580_Group.Utils.Utility;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

//Lombok annotations
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "capstone-project")
public class CapstoneProject {
    // CapstoneProject Entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "company_id")
    @JsonBackReference
    private CompanyAcc company;

    @ManyToOne(fetch = FetchType.EAGER)
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

    @Column(name = "capstone_status")
    private String capstoneStatus;

    @Column(name = "capstone_image")
    private Long imageId;
    public CapstoneProject(CompanyAcc company,
                           SupervisorAcc supervisor,
                           String projectTitle,
                           String projectIntroduction,
                           String projectObjectives,
                           String projectSuccessCriteria,
                           String technicalRequirements,
                           String projectDescription,
                           String academicBackground,
                           int noStudents,
                           String interviewReqs,
                           Boolean multiTeamAllow,
                           String capstoneStatus,
                           Long imageId) {
        this.company = company;
        this.supervisor = supervisor;
        this.projectTitle = projectTitle;
        this.projectIntroduction = projectIntroduction;
        this.projectObjectives = projectObjectives;
        this.projectSuccessCriteria = projectSuccessCriteria;
        this.technicalRequirements = technicalRequirements;
        this.projectDescription = projectDescription;
        this.academicBackground = academicBackground;
        this.noStudents = noStudents;
        this.interviewReqs = interviewReqs;
        this.multiTeamAllow = multiTeamAllow;
        this.capstoneColor = Utility.returnColor();
        this.capstoneStatus = capstoneStatus;
        this.imageId = imageId;
    }


}
