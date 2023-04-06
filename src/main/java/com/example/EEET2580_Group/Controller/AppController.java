package com.example.EEET2580_Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    @GetMapping("/")
    public String viewHomePage() {
        return "index";
    }

    @GetMapping("/main")
    public String viewMainPage() {
        return "capstone-list";
    }
}
