package com.example.EEET2580_Group.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "supervisor_acc")
public class SupervisorAcc extends Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supervisor_id")
    private Long id;
    @OneToMany
    @JsonBackReference
    private List<GroupEntity> group;
    @Column(name = "supervisor_name")
    private String supervisorName;
    
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    public void setAccount(Account account) {
        username = account.getUsername();
        password = account.getPassword();
        email = account.getEmail();
    }
}
