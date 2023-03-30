package com.example.EEET2580_Group.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "capstone_project")
public class CapstoneProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;

//    private String team;
//    private String status;
//    private String date;
//    private String link;
}
