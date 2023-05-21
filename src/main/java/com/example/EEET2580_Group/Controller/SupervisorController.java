package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.DTO.SupervisorAccDto;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.SupervisorAccService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supervisor")
public class SupervisorController {
    @Autowired
    SupervisorAccService supervisorAccService;

    @GetMapping()
    public List<SupervisorAcc> getAllSupervisor(){
        return supervisorAccService.getAllSupervisor();
    }

    @PutMapping(value = "/update-profile/{id}")
    public void updateSupervisor(@PathVariable Long id,
                                         @RequestBody SupervisorAccDto supervisorAccDto){
        System.out.println("update supervisor");
        supervisorAccService.updateSupervisorById(id, supervisorAccDto);
    }
    @GetMapping("/search")
    public Page<SupervisorAccDto> getAllCompany (@RequestParam(name = "acc_name",defaultValue = "") String supervisorName,
                                              @RequestParam(name = "page",defaultValue = "0") String page,
                                              @RequestParam(name = "size",defaultValue = "6") String size,
                                              @RequestParam(name = "sort",defaultValue = "asc") String sort){
        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }
        Page<SupervisorAcc> result =  supervisorAccService.getAllSupervisor(supervisorName, pageable);
        Page<SupervisorAccDto> dtoConvert = result.map(object -> new SupervisorAccDto(object));
        return dtoConvert;
    }
}
