package com.example.EEET2580_Group.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "capstone_project")
public class CapstoneProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "admin_id")
    private Long adminId;

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
    private String noStudents;

    @Column(name = "interview_reqs")
    private String interviewReqs;

    @Column(name = "multi_team_allow")
    private String multiTeamAllow;

    @Column(name = "supervisor")
    private String supervisor;

    @Column(name = "company_email")
    private String companyEmail;

}
