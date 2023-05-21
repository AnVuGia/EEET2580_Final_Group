package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.StudentAccDto;

import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Service.Implementation.StudentServiceImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface StudentService {
    Page<StudentAcc> getAllStudent (String studentName, Pageable page);

    void updateStudentPersonaById(Long id, StudentAccDto studentDto);

    void updateStudentSkillsById(Long id, StudentAccDto studentDto);

    void updateStudentBibById(Long id, StudentAccDto studentDto);

    void updateStudentProfilePicById(Long id, StudentAccDto studentDto);
}
