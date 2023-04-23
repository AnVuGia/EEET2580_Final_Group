package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.GroupEntity;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/group")
public class GroupController {
    @Autowired
    private GroupService groupService;
    @Autowired
    StudentAccRepository studentAccRepository;
    @PostMapping("/test")
    public ResponseEntity<GroupEntity> test() {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setGroupName("Group 1");
        StudentAcc studentAcc1 = new StudentAcc();
        studentAcc1.setStudentName("Student 1");
        StudentAcc studentAcc2 = new StudentAcc();
        studentAcc2.setStudentName("Student 2");
        groupEntity.addStudent(studentAcc1);
        groupEntity.addStudent(studentAcc2);
        groupService.saveGroup(groupEntity);
        studentAccRepository.save(studentAcc1);
        studentAccRepository.save(studentAcc2);
        System.out.println("Done");
        return ResponseEntity.ok(groupEntity);
    }
    @GetMapping("/result")
    public ResponseEntity<GroupEntity> result() {
        GroupEntity groupEntity = groupService.getAllGroup().get(0);
        return ResponseEntity.ok(groupEntity);
    }
}
