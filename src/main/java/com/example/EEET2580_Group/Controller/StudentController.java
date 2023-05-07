package com.example.EEET2580_Group.Controller;



import com.example.EEET2580_Group.DTO.StudentDto;
import com.example.EEET2580_Group.Service.Interface.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StudentController {
    @Autowired
    StudentService studentService;
    @PutMapping(value = "/student/update/{id}")
    public void updateStudentInfo(@PathVariable Long id,
                                  @RequestBody StudentDto studentDto){
        System.out.println("update student");
        studentService.updateStudentinfoById(id, studentDto);
    }
}
