package com.example.EEET2580_Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class AppController {
    // Controller for the index page
    @GetMapping("/")
    public String viewHomePage() {
        return "index";
    }

    // Controller for the capstone_list page
    @GetMapping("/main")
    public String viewMainPage() {
        return "capstone-list";
    }

    // Controller for the find capstone page
    @GetMapping("/find-capstone-page")
    public String viewFindCapstonePage() {
        return "find-capstone";
    }

    @GetMapping("/sign-up-page")
    public String viewSignUpPage() {
        return "sign-up";
    }

    @GetMapping("/sign-in-page")
    public String viewSignInPage() {
        return "sign-in";
    }
}
