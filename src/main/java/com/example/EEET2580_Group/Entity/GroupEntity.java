package com.example.EEET2580_Group.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "student-group")
public class GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;
    @Column(name = "group_name")
    private String groupName;
    @OneToMany(mappedBy = "group")
    private List<StudentAcc> student;

    public void addStudent(StudentAcc studentAcc) {
        student.add(studentAcc);
        studentAcc.setGroup(this);
    }
    public GroupEntity(){
        student = new ArrayList<>();
    }
}
