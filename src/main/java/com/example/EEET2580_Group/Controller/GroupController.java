package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.AccountDto;
import com.example.EEET2580_Group.DTO.GroupDto;
import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.Entity.GroupEntity;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import com.example.EEET2580_Group.Service.Interface.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/group")
public class GroupController {
    @Autowired
    private GroupService groupService;
    @Autowired
    private StudentAccRepository studentAccRepository;

    @PutMapping()
    public void udpateGroup (@RequestBody GroupDto groupDto ){
        this.groupService.updateGroup(groupDto);
    }

    @PostMapping()
    public void addGroup (@RequestBody GroupDto groupDto ){
        this.groupService.saveGroup(groupDto);
    }
    @GetMapping("/search")
    public Page<GroupEntity> getAllGroup (@RequestParam(name = "group_name",defaultValue = "") String groupName,
                                    @RequestParam(name = "page",defaultValue = "0") String page,
                                    @RequestParam(name = "size",defaultValue = "6") String size,
                                    @RequestParam(name = "sort",defaultValue = "asc") String sort){
        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }
        return groupService.getAllGroup(groupName, pageable);
    }

    @GetMapping("/{studentId}")
    public GroupDto getStudentsInGroup (@PathVariable Long studentId){
       StudentAcc student =  studentAccRepository.findById(studentId).get();
       GroupEntity group = student.getGroup();
       return group == null? new GroupDto(): new GroupDto(group);
    }


}
