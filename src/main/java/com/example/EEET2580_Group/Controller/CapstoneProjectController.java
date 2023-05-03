package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Service.Interface.CapstoneProjectService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CapstoneProjectController {
    // Capstone Project related API
    @Autowired
    CapstoneProjectService capstoneProjectService;

    // Add Capstone Project to database
    @PostMapping("/capstone-project")
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
    @PutMapping(value = "/capstone-project/{id}")
    public void updateCapstoneProject(@PathVariable Long id,
                                      @RequestBody CapstoneProjectDto capstoneProjectDto) {
        System.out.println("update capstone");
        capstoneProjectService.updateCapstoneProjectById(id, capstoneProjectDto);
    }

    // Get all Capstone Project from database
    @GetMapping("/capstone-projects")
    public List<CapstoneProjectDto> findAllCapstoneProject() {
        List<CapstoneProject> result = capstoneProjectService.getAllCapstoneProject();
        List<CapstoneProjectDto> dtoConvert = result.stream()
                .map(capstone -> new CapstoneProjectDto(capstone)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/pending-capstone-projects")
    public Page<CapstoneProjectDto> findAllPendingCapstoneProject(@RequestParam(name = "page", defaultValue = "0") String page,
                                                                  @RequestParam(name = "size", defaultValue = "6") String size) {
        Pageable pageable = null;
        pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
        Page<CapstoneProject> result = capstoneProjectService.findAllPendingCapstone(pageable);
        Page<CapstoneProjectDto> dtoConvert = result.map(object -> new CapstoneProjectDto(object));
        return dtoConvert;
    }

    @GetMapping("/capstone-project/id/{id}")
    public CapstoneProjectDto findCapstoneProjectById(@PathVariable("id") Long id) {
        CapstoneProject capstoneProject = capstoneProjectService.findById(id).get();
        return new CapstoneProjectDto(capstoneProject);
    }

    @GetMapping("/capstone-project/title/{title}")
    public CapstoneProject findCapstoneProjectByTitle(@PathVariable("title") String title) {
        CapstoneProject capstoneProject = capstoneProjectService.findByTitle(title).get();
        return capstoneProject;
    }

    @GetMapping("/capstone-project/company_name")
    public Page<CapstoneProject> findByCompanyName(@RequestParam(name = "company_name", defaultValue = "") String companyName,
                                                   @RequestParam(name = "page", defaultValue = "0") String page,
                                                   @RequestParam(name = "size", defaultValue = "6") String size,
                                                   @RequestParam(name = "sort", defaultValue = "asc") String sort) {

        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }

        return capstoneProjectService.findByCompanyName(companyName, pageable);
    }

    @GetMapping("/approved-capstone-projects")
    public Page<CapstoneProjectDto> filterAll(@RequestParam(name = "capstone_name", defaultValue = "") String capstoneName,
                                              @RequestParam(name = "company_name", defaultValue = "") String companyName,
                                              @RequestParam(name = "supervisor_name", defaultValue = "") String supervisorName,
                                              @RequestParam(name = "page", defaultValue = "0") String page,
                                              @RequestParam(name = "size", defaultValue = "6") String size,
                                              @RequestParam(name = "sort", defaultValue = "asc") String sort) {

        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }

        if (capstoneName.isEmpty() && companyName.isEmpty() && supervisorName.isEmpty()) {
            Page<CapstoneProject> result = capstoneProjectService.findPaginated(pageable);
            Page<CapstoneProjectDto> dtoConvert = result.map(object -> new CapstoneProjectDto(object));
            return dtoConvert;
        }
        Page<CapstoneProject> result =
                capstoneProjectService.filterAll(capstoneName, companyName, supervisorName, pageable);
        Page<CapstoneProjectDto> dtoConvert = result.map(object -> new CapstoneProjectDto(object));
        return dtoConvert;
    }

    //testing
    @GetMapping("/capstone-project/test/{id}")
    public CompanyAcc capstoneProjectCompany(@PathVariable Long id) {
        CapstoneProject capstoneProject = capstoneProjectService.findById(id).get();
        return capstoneProject.getCompany();
    }

    @GetMapping("/capstone-project/company")
    public List<CapstoneProject> findCapstoneProjectByCompanyName(@RequestParam(name = "company-name") String companyName) {
        List<CapstoneProject> capstoneProjects = capstoneProjectService.findAllProjectByCompanyName(companyName, "approved");
        return capstoneProjects;
    }

    @GetMapping("/capstone-project/{companyName}/{status}")
    public Page<CapstoneProject> findCapstoneProjectByStatus(@PathVariable String status,
                                                             @PathVariable String companyName,
                                                             @RequestParam(name = "page", defaultValue = "0") String page, @RequestParam(name = "size", defaultValue = "3") String size) {
        Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));

        if (status.equals("pending")) {

            Page<CapstoneProject> capstoneProjects =
                    capstoneProjectService.findAllPendingCapstoneByCompanyName(companyName, pageable);
            return capstoneProjects;
        } else if (status.equals("approved")) {

            Page<CapstoneProject> capstoneProjects = capstoneProjectService.findAllApprovedCapstoneByCompanyName(companyName,
                    pageable);
            return capstoneProjects;
        } else if (status.equals("rejected")) {
            Page<CapstoneProject> capstoneProjects = capstoneProjectService.findAllRejectedCapstoneByCompanyName(companyName,
                    pageable);
            return capstoneProjects;
        } else {
            Page<CapstoneProject> capstoneProjects = capstoneProjectService.findAllPendingCapstoneByCompanyName(companyName,
                    pageable);
            return capstoneProjects;
        }
    }
}

