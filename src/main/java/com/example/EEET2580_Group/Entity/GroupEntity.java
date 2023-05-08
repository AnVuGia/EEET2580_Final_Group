package com.example.EEET2580_Group.Entity;

import com.example.EEET2580_Group.DTO.GroupDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Table(name = "student-group")
public class
GroupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;
    @Column(name = "group_name")
    private String groupName;

    @OneToMany(mappedBy = "group")
    @JsonBackReference
    private List<StudentAcc> studentAccList;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "capstone_id", referencedColumnName = "id")
    private CapstoneProject capstoneId;


    public GroupEntity (GroupDto groupDto){
        this.groupName = groupDto.getGroupName();
    }

}
