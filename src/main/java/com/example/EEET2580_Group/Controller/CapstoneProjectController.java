package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;
import com.example.EEET2580_Group.Service.CapstoneProjectService;

import java.net.http.HttpHeaders;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("capstone")
public class CapstoneProjectController {
    @Autowired
    CapstoneProjectService capstoneProjectService;

    @PostMapping("/add")
    public String addCapstoneProject(@RequestBody CapstoneProjectResponse capstoneProject) {
        capstoneProjectService.saveCapstoneProject(capstoneProject);
        System.out.println(capstoneProject.getName() + " " + capstoneProject.getDescription());
        return "index";
    }

    @PostMapping("/delete")
    public String deleteCapstoneProject(@RequestParam("id") Long id) {
        capstoneProjectService.deleteCapstoneProjectById(id);
        return "index";
    }

    @PostMapping("/update")
    public String updateCapstoneProject(@RequestParam("id") Long id,
            @RequestBody CapstoneProjectResponse capstoneProject) {
        capstoneProjectService.updateCapstoneProjectById(id, capstoneProject);
        return "index";
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<CapstoneProject>> getAllCapstoneProject(@RequestParam("page") int page,
            @RequestParam("size") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<CapstoneProject> capstoneProjects = capstoneProjectService.findPaginated(pageable);
        return ResponseEntity.ok(capstoneProjects);

    }

    @GetMapping("/findAll")
    public ResponseEntity<List<CapstoneProject>> findAllCapstoneProject() {
        List<CapstoneProject> capstoneProjects = capstoneProjectService.getAllCapstoneProject();
        return new ResponseEntity<List<CapstoneProject>>(capstoneProjects, org.springframework.http.HttpHeaders.EMPTY,
                org.springframework.http.HttpStatus.OK);

    }

}
