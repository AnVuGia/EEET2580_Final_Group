package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.StudentAcc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAccDto extends AccountDto{
    private List<String> skills;
    private String major;
    private Long contact;
    private String bib;

    public StudentAccDto(StudentAcc studentAcc){
        super(studentAcc);
        this.major = studentAcc.getMajor();
        this.contact = studentAcc.getContact();
        this.skills = studentAcc.getSkills();
        this.bib = studentAcc.getBib();
    }


}
