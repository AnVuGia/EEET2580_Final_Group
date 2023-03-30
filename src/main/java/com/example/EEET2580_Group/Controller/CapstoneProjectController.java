package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;
import com.example.EEET2580_Group.Service.CapstoneProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CapstoneProjectController {
    @Autowired
    CapstoneProjectService capstoneProjectService;

    @PostMapping("/api/capstoneProject/add")
    public String addCapstoneProject(@ModelAttribute("capstoneProjectDataResponse") CapstoneProjectResponse capstoneProjectDataResponse, Model model){
        model.addAttribute("capstoneProjectDataResponse", capstoneProjectDataResponse);
        CapstoneProject temp_capstoneProject = new CapstoneProject();
        temp_capstoneProject.setName(capstoneProjectDataResponse.getName());
        temp_capstoneProject.setDescription(capstoneProjectDataResponse.getDescription());
        capstoneProjectService.saveCapstoneProject(temp_capstoneProject);
        return "success_page";
    }
    @GetMapping("/")
    public String getIndex(Model model){
        model.addAttribute("capstoneProjectDataResponse", new CapstoneProjectResponse());
        return "index";
    }
}
