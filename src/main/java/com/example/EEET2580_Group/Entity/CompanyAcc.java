package com.example.EEET2580_Group.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Entity

@Table(name = "company_acc")
public class CompanyAcc extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long id;
    @Column(name = "company_name")
    private String companyName;
    @Column(name = "company_description")
    private String companyDescription;
    @OneToMany(mappedBy = "company")
    @JsonBackReference
    private List<CapstoneProject> capstoneProjects;
}

