package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Service.Interface.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class StudentServiceImp implements StudentService {
    @Autowired
    private StudentAccRepository studentAccRepository;

    public void updateStudentPersona(StudentAcc oldStudent, StudentAccDto newStudent){
        oldStudent.setName(newStudent.getName());
        oldStudent.setContact(newStudent.getContact());
        oldStudent.setEmail(newStudent.getEmail());
        oldStudent.setMajor(newStudent.getMajor());
        oldStudent.setPassword(newStudent.getPassword());
        oldStudent.setBib(newStudent.getBib());
    }

    public void updateStudentSkill(StudentAcc oldStudent, StudentAccDto newStudent){
        oldStudent.setSkills(newStudent.getSkills());
    }

    public void updateStudentBib(StudentAcc oldStudent, StudentAccDto newStudent){
//        oldStudent.setBib(newStudent.getBib());
    }

    @Override
    public void updateStudentPersonaById(Long id, StudentAccDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudentPersona(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

    @Override
    public void updateStudentSkillsById(Long id, StudentAccDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudentSkill(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

    @Override
    public void updateStudentBibById(Long id, StudentAccDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        this.updateStudentBib(studentToUpdate,studentDto);
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }

    @Override
    public void updateStudentProfilePicById(Long id, StudentAccDto studentDto) {
        StudentAcc studentToUpdate = studentAccRepository.findById(id).get();
        studentToUpdate.setImageId(studentDto.getImageId());
        studentAccRepository.save(studentToUpdate);
        System.out.println("Student updated");
    }
    @Override
    public Page<StudentAcc> getAllStudent (String studentName, Pageable page){
        return studentName.isEmpty()?studentAccRepository.findAll(page):
                studentAccRepository.findByName(studentName,page);
    }
}
