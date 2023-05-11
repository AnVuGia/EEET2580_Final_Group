package com.example.EEET2580_Group.Controller;


import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.Service.Interface.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
public class StudentController {
    @Autowired
    StudentService studentService;
    @PutMapping(value = "/student/update/{id}/persona")
    public void updateStudentPersonaInfo(@PathVariable Long id,
                                  @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentPersonaById(id, studentDto);
    }

    @PutMapping(value = "/student/update/{id}/skills")
    public void updateStudentSkillsInfo(@PathVariable Long id,
                                  @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentSkillsById(id, studentDto);
    }

    @PutMapping(value = "/student/update/{id}/Bib")
    public void updateStudentBibInfo(@PathVariable Long id,
                                     @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentBibById(id, studentDto);
    }
}
