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
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "company_acc")
public class CompanyAcc extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long id;
    @Column(name = "company_name")
    private String name;
    @Column(name = "company_description")
    private String companyDescription;
    
    @OneToMany(mappedBy = "company")
    @JsonBackReference
    private List<CapstoneProject> capstoneProjects;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;

    @Column(name = "contact")
    private Long contact;
    @Column(name = "profile_image")
    private Long imageId;
    @Column(name = "manager")
    private String manager;

    @Column(name = "manager_contact")
    private Long manager_contact;




    public void setAccount(Account account) {
        username = account.getUsername();
        password = account.getPassword();
        email = account.getEmail();
        name = account.getName();
    }
}
