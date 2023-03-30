package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.CapstoneProjectResponse;
import com.example.EEET2580_Group.Service.CapstoneProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

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
    @PostMapping("/api/capstoneProject/delete")
    public String deleteCapstoneProject(@ModelAttribute("capstoneProjectDataResponse") CapstoneProjectResponse capstoneProjectDataResponse, Model model){
        model.addAttribute("capstoneProjectDataResponse", capstoneProjectDataResponse);
        CapstoneProject temp_capstoneProject = capstoneProjectService.findById(capstoneProjectDataResponse.getId()).get();
        capstoneProjectService.deleteCapstoneProjectById(temp_capstoneProject.getId());
        return "success_page";
    }
    @PostMapping("/api/capstoneProject/data")
    public List<CapstoneProject> getCapstoneProjectData(){
        return capstoneProjectService.getAllCapstoneProject();
    }
    @PostMapping("/api/capstoneProject/update")
    public String updateCapstoneProject(@ModelAttribute("capstoneProjectDataResponse") CapstoneProjectResponse capstoneProjectDataResponse, Model model){
        model.addAttribute("capstoneProjectDataResponse", capstoneProjectDataResponse);
        CapstoneProject temp_capstoneProject = capstoneProjectService.findById(capstoneProjectDataResponse.getId()).get();
        temp_capstoneProject.setName(capstoneProjectDataResponse.getName());
        temp_capstoneProject.setDescription(capstoneProjectDataResponse.getDescription());
        capstoneProjectService.saveCapstoneProject(temp_capstoneProject);
        return "success_page";
    }
    @GetMapping("/items")
    public String itemList(@RequestParam(defaultValue = "0") int page, Model model) {
        int pageSize = 10; // number of items to display on each page
        Page<CapstoneProject> itemPage = capstoneProjectService.findPaginated(page, pageSize);
        model.addAttribute("items", itemPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", itemPage.getTotalPages());
        return "item_list";
    }

    @GetMapping("/")
    public String getIndex(Model model){
        model.addAttribute("capstoneProjectDataResponse", new CapstoneProjectResponse());
        return "index";
    }
}
