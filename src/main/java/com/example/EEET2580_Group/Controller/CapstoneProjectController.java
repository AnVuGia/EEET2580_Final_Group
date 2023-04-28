package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Service.Interface.CapstoneProjectService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CapstoneProjectController {
    // Capstone Project related API
    @Autowired
    CapstoneProjectService capstoneProjectService;

    // Add Capstone Project to database
        @PostMapping("/capstone-project/add")
        public void addCapstoneProject(@RequestBody CapstoneProjectDto capstoneProject) {
            capstoneProjectService.saveCapstoneProject(capstoneProject);
            System.out.println(capstoneProject.getProjectTitle() + " " + capstoneProject.getProjectDescription());

        }

    // Delete Capstone Project from database
    @DeleteMapping("/capstone-project")
    public void deleteCapstoneProject(@RequestParam("id") Long id) {
        capstoneProjectService.deleteCapstoneProjectById(id);

    }

    // Update Capstone Project in database
    @PutMapping("/capstone-project/{id}")
    public void updateCapstoneProject(@PathVariable("id") Long id,
                                      @RequestBody CapstoneProjectDto capstoneProject) {
        capstoneProjectService.updateCapstoneProjectById(id, capstoneProject);
    }

    // Get all Capstone Project from database
    @GetMapping("/capstone-project/all")
    public List<CapstoneProject> findAllCapstoneProject() {
        List<CapstoneProject> capstoneProjects = capstoneProjectService.getAllCapstoneProject();
        return capstoneProjects;
    }

    @GetMapping("/capstone-project/id/{id}")
    public CapstoneProject findCapstoneProjectById(@PathVariable("id") Long id) {
        CapstoneProject capstoneProject = capstoneProjectService.findById(id).get();
        return capstoneProject;
    }

    @GetMapping("/capstone-project/title/{title}")
    public CapstoneProject findCapstoneProjectByTitle(@PathVariable("title") String title) {
        CapstoneProject capstoneProject = capstoneProjectService.findByTitle(title).get();
        return capstoneProject;
    }

    @GetMapping("/capstone-project/company_name")
    public Page<CapstoneProject> findByCompanyName(@RequestParam(name = "company_name",defaultValue = "") String companyName,
                                                   @RequestParam(name = "page",defaultValue = "0") String page,
                                                   @RequestParam(name = "size",defaultValue = "6") String size,
                                                   @RequestParam(name = "sort",defaultValue = "asc") String sort){

        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }

        return capstoneProjectService.findByCompanyName(companyName,pageable);
    }
    @GetMapping("/capstone-project/search")
    public Page<CapstoneProject> filterAll(@RequestParam(name = "capstone_name",defaultValue = "") String capstoneName,
                                           @RequestParam(name = "company_name",defaultValue = "") String companyName,
                                           @RequestParam(name = "supervisor_name",defaultValue = "") String supervisorName,
                                           @RequestParam(name = "page",defaultValue = "0") String page,
                                           @RequestParam(name = "size",defaultValue = "6") String size,
                                           @RequestParam(name = "sort",defaultValue = "asc") String sort){

        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }
//        if (companyName.isEmpty()) System.out.println("companyName is empty");
        if (capstoneName.isEmpty()&&companyName.isEmpty()&&supervisorName.isEmpty()) {
            return capstoneProjectService.findPaginated(pageable);
        }
        return capstoneProjectService.filterAll(capstoneName,companyName,supervisorName,pageable);
    }

    //testing
    @GetMapping("/capstone-project/test/{id}")
    public CompanyAcc capstoneProjectCompany(@PathVariable Long id) {
        CapstoneProject capstoneProject = capstoneProjectService.findById(id).get();
        return capstoneProject.getCompany();
    }

    @GetMapping("/capstone-project/company")
    public List<CapstoneProject> findCapstoneProjectByCompanyName(@RequestParam(name = "company-name") String companyName) {
        List<CapstoneProject> capstoneProjects = capstoneProjectService.findAllProjectByCompanyName(companyName);
        return capstoneProjects;
    }
}

