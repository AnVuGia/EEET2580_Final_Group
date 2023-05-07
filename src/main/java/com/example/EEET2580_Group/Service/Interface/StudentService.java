package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.StudentDto;

import org.springframework.stereotype.Service;

@Service
public interface StudentService {

    void updateStudentinfoById(Long id, StudentDto studentDto);
}
