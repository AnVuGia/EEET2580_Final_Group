package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.GroupEntity;
import com.example.EEET2580_Group.Entity.StudentAcc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private Long id;
    private String studentName;
//    private GroupEntity group;
    private String username;
    private String password;
    private String email;
    private List<String> skills;
//    private Long imageId;
    private String major;
    private Long contact;

    public StudentDto(StudentAcc studentAcc){
        this.id = studentAcc.getId();
        this.studentName = studentAcc.getName();
//    this.group = studentAcc.getGroup();
        this.username = studentAcc.getUsername();
        this.password = studentAcc.getPassword();
        this.email = studentAcc.getEmail();
//    this.imageId= studentAcc.getImages();
        this.major = studentAcc.getMajor();
        this.contact = studentAcc.getContact();
        this.skills = studentAcc.getSkills();

    }


}
