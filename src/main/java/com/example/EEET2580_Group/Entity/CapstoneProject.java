package com.example.EEET2580_Group.Entity;

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

    @OneToOne
    @JoinColumn(name = "company_id")
    private CompanyAcc company;

    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "supervisor_id")
    private String supervisor;

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


}
