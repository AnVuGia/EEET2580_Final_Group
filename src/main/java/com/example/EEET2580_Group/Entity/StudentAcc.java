package com.example.EEET2580_Group.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "student_acc")
public class StudentAcc extends Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;
    @Column(name = "student_name")
    private String studentName;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "group_id")
    private GroupEntity group;
    
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
        studentName = account.getName();
    }
}
