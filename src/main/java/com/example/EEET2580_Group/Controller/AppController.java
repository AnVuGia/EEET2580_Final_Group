package com.example.EEET2580_Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class AppController {


    @GetMapping("/sign-up-page")
    public String viewSignUpPage() {
        return "sign-up";
    }
    @GetMapping("/")
    public String viewMainPage1() {
        return "main-page";
    }
    @GetMapping("/sign-in-page")
    public String viewSignInPage()  {
        return "sign-in";
    }
}
