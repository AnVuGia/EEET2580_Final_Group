package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.GroupEntity;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Service.Interface.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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
    @GetMapping("/all")
    public List<GroupEntity> result() {
        List<GroupEntity> groupEntity = groupService.getAllGroup();
        return groupEntity;
    }
}
