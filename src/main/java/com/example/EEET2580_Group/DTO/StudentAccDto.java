package com.example.EEET2580_Group.DTO;

import com.example.EEET2580_Group.Entity.StudentAcc;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
public class StudentAccDto extends AccountDto{
    public StudentAccDto(StudentAcc account){
        super(account);
    }

}
