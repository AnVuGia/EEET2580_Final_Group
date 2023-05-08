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

    public void updateStudentPersona(StudentAcc oldStudent, StudentDto newStudent){
        System.out.println("INside update student");
        oldStudent.setName(newStudent.getStudentName());
        oldStudent.setContact(newStudent.getContact());
        oldStudent.setEmail(newStudent.getEmail());
        oldStudent.setMajor(newStudent.getMajor());
//        oldStudent.setSkills(newStudent.getSkills());
        //image, bib, group
    }

    public void updateStudentSkill(StudentAcc oldStudent, StudentDto newStudent){
        oldStudent.setSkills(newStudent.getSkills());
    }

    public void updateStudentBib(StudentAcc oldStudent, StudentDto newStudent){
//        oldStudent.setBib(newStudent.getBib());
    }

    @Override
    public void updateStudentPersonaById(Long id, StudentDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudentPersona(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

    @Override
    public void updateStudentSkillsById(Long id, StudentDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudentSkill(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

    @Override
    public void updateStudentBibById(Long id, StudentDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudentBib(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

}
