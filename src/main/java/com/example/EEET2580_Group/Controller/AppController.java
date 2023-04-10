package com.example.EEET2580_Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

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
    @GetMapping("/find-capstone")
    public String viewFindCapstonePage() {
        return "find-capstone";
    }

    @GetMapping("/sign-up")
    public String viewSignUpPage() {
        return "sign-up";
    }

    @GetMapping("/sign-in")
    public String viewSignInPage() {
        return "sign-in";
    }
}
