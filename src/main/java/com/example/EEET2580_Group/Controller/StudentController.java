package com.example.EEET2580_Group.Controller;


import com.example.EEET2580_Group.DTO.CompanyAccDto;
import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Service.Interface.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    StudentService studentService;
    @PutMapping(value = "/update/{id}/persona")
    public void updateStudentPersonaInfo(@PathVariable Long id,
                                  @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentPersonaById(id, studentDto);
    }

    @PutMapping(value = "/update/{id}/skills")
    public void updateStudentSkillsInfo(@PathVariable Long id,
                                  @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentSkillsById(id, studentDto);
    }

    @PutMapping(value = "/update/{id}/Bib")
    public void updateStudentBibInfo(@PathVariable Long id,
                                     @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentBibById(id, studentDto);
    }
    @PutMapping(value = "/update/{id}/profile-pic")
    public void updateStudentProfilePicInfo(@PathVariable Long id,
                                     @RequestBody StudentAccDto studentDto){
        System.out.println("update student");
        studentService.updateStudentProfilePicById(id, studentDto);
    }
    @GetMapping("/search")
    public Page<StudentAccDto> getAllCompany (@RequestParam(name = "acc_name",defaultValue = "") String studentName,
                                              @RequestParam(name = "page",defaultValue = "0") String page,
                                              @RequestParam(name = "size",defaultValue = "6") String size,
                                              @RequestParam(name = "sort",defaultValue = "asc") String sort){
        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }
        Page<StudentAcc> result =  studentService.getAllStudent(studentName, pageable);
        Page<StudentAccDto> dtoConvert = result.map(object -> new StudentAccDto(object));
        return dtoConvert;
    }
}
