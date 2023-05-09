package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.StudentDto;
import com.example.EEET2580_Group.DTO.SupervisorAccDto;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.SupervisorAccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SupervisorController {
    @Autowired
    SupervisorAccService supervisorAccService;

    @GetMapping("/supervisor")
    public List<SupervisorAcc> getAllSupervisor(){
        return supervisorAccService.getAllSupervisor();
    }

    @PutMapping(value = "/supervisor/update-profile/{id}")
    public void updateSupervisor(@PathVariable Long id,
                                         @RequestBody SupervisorAccDto supervisorAccDto){
        System.out.println("update supervisor");
        supervisorAccService.updateSupervisorById(id, supervisorAccDto);
    }
}
