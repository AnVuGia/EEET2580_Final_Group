package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.StudentDto;

import org.springframework.stereotype.Service;

@Service
public interface StudentService {

    void updateStudentPersonaById(Long id, StudentDto studentDto);

    void updateStudentSkillsById(Long id, StudentDto studentDto);

    void updateStudentBibById(Long id, StudentDto studentDto);
}
