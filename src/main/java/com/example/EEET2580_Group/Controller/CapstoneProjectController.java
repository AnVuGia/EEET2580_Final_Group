package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;
import com.example.EEET2580_Group.Service.CapstoneProjectService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api")
public class CapstoneProjectController {
    // Capstone Project related API
    @Autowired
    CapstoneProjectService capstoneProjectService;

    // Add Capstone Project to database
    @PostMapping("/capstone-project")
    public String addCapstoneProject(@RequestBody CapstoneProjectResponse capstoneProject) {
        capstoneProjectService.saveCapstoneProject(capstoneProject);
        System.out.println(capstoneProject.getTitle() + " " + capstoneProject.getDescription());
        return "index";
    }

    // Delete Capstone Project from database
    @DeleteMapping("/capstone-project")
    public String deleteCapstoneProject(@RequestParam("id") Long id) {
        capstoneProjectService.deleteCapstoneProjectById(id);
        return "index";
    }

    // Update Capstone Project in database
    @PutMapping("/capstone-project")
    public String updateCapstoneProject(@RequestParam("id") Long id,
            @RequestBody CapstoneProjectResponse capstoneProject) {
        capstoneProjectService.updateCapstoneProjectById(id, capstoneProject);
        return "index";
    }

    // Get Capstone Project from database with paagination
    @GetMapping("/capstone-project/all/pagination")
    public ResponseEntity<Page<CapstoneProject>> getAllCapstoneProject(@RequestParam("page") int page,
            @RequestParam("size") int size) {
        // Pageable with page, size and sort (incase don't want to sort, just use
        // Pageable pageable = PageRequest.of(page,size))
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<CapstoneProject> capstoneProjects = capstoneProjectService.findPaginated(pageable);
        return ResponseEntity.ok(capstoneProjects);

    }

    // Get all Capstone Project from database
    @GetMapping("/capstone-project/all")
    public ResponseEntity<List<CapstoneProject>> findAllCapstoneProject() {
        List<CapstoneProject> capstoneProjects = capstoneProjectService.getAllCapstoneProject();
        return new ResponseEntity<List<CapstoneProject>>(capstoneProjects, org.springframework.http.HttpHeaders.EMPTY,
                org.springframework.http.HttpStatus.OK);

    }

    @GetMapping("/capstone-project/id")
    public ResponseEntity<CapstoneProject> findCapstoneProjectById(@RequestParam("id") Long id) {
        CapstoneProject capstoneProject = capstoneProjectService.findById(id).get();
        return new ResponseEntity<CapstoneProject>(capstoneProject, org.springframework.http.HttpHeaders.EMPTY,
                org.springframework.http.HttpStatus.OK);

    }

    @GetMapping("/capstone-project/title")
    public ResponseEntity<CapstoneProject> findCapstoneProjectByTitle(@RequestParam("title") String title) {
        CapstoneProject capstoneProject = capstoneProjectService.findByTitle(title).get();
        return new ResponseEntity<CapstoneProject>(capstoneProject, org.springframework.http.HttpHeaders.EMPTY,
                org.springframework.http.HttpStatus.OK);

    }
}
