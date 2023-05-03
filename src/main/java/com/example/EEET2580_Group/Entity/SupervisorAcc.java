package com.example.EEET2580_Group.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "supervisor_acc")
public class SupervisorAcc extends Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supervisor_id")
    private Long id;

    @OneToMany
    @JsonBackReference
    @JoinColumn(name = "group_id")
    private List<GroupEntity> group;

    @OneToMany (mappedBy = "supervisor")
    @JsonBackReference
    private List<CapstoneProject> capstoneProjectList;

    @Column(name = "supervisor_name")
    private String name;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private String role;


    public void setAccount(Account account) {
        name = account.getName();
        username = account.getUsername();
        password = account.getPassword();
        email = account.getEmail();
        role = "supervisor";

    }
}
