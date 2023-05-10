package com.example.EEET2580_Group.Entity;

import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_acc")
public class StudentAcc extends Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long id;
    @Column(name = "student_name")
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "group_id")
    private GroupEntity group;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "skills", columnDefinition = "text[]")
    private List<String> skills;
    @Column(name = "major")
    private String major;
    @Column(name = "contact")
    private Long contact;
    @Column(name = "profile_image")
    private Long imageId;
    public List<String> getSkills() {
        return this.skills;
    }
    
    public void setAccount(Account account) {
        username = account.getUsername();
        password = account.getPassword();
        email = account.getEmail();
        name = account.getName();
    }

}
