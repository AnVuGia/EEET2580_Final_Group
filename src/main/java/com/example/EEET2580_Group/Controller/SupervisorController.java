package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.SupervisorAccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SupervisorController {
    @Autowired
    SupervisorAccService supervisorService;

    @GetMapping("/supervisor")
    public List<SupervisorAcc> getAllSupervisor(){
        return supervisorService.getAllSupervisor();
    }
}
