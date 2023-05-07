package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.DTO.StudentDto;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Service.Interface.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class StudentServiceImp implements StudentService {
    @Autowired
    private StudentAccRepository studentAccRepository;

    public void updateStudent(StudentAcc oldStudent, StudentDto newStudent){
        System.out.println("INside update student");
        oldStudent.setStudentName(newStudent.getStudentName());
        oldStudent.setContact(newStudent.getContact());
        oldStudent.setEmail(newStudent.getEmail());
        oldStudent.setMajor(newStudent.getMajor());
        oldStudent.setSkills(newStudent.getSkills());

        //image, bib, group
    }

    @Override
    public void updateStudentinfoById(Long id, StudentDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudent(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

}
