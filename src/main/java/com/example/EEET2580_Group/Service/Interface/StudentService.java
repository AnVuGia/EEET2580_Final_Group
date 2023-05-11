package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.StudentAccDto;

import org.springframework.stereotype.Service;

@Service
public interface StudentService {

    void updateStudentPersonaById(Long id, StudentAccDto studentDto);

    void updateStudentSkillsById(Long id, StudentAccDto studentDto);

    void updateStudentBibById(Long id, StudentAccDto studentDto);
}
