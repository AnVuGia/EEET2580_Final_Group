package com.example.EEET2580_Group.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class AppController {
    @GetMapping("/sign-up-page")
    public String viewSignUpPage() {
        return "sign-up";
    }
    @GetMapping("/{viewPage}")
    public String viewMainPage(@PathVariable String viewPage){
        if (viewPage.equals("admin")){
            return "admin-main-page";
        }else if (viewPage.equals("student")){
            return "student-main-page";
        }else if (viewPage.equals("company")){
            return "company-main-page";
        }else if (viewPage.equals("supervisor"))
            return "supervisor-main-page";
        return "student-main-page";
    }
    @GetMapping("/sign-in-page")
    public String viewSignInPage()  {
        return "sign-in";
    }
    @GetMapping("/capstone-info-page")
    public String viewCapstoneInfoPage() {
        return "capstone-info";
    }
    @GetMapping("/group-list-page")
    public String viewGroupListPage() {
        return "group-list";
    }
    @GetMapping("/account-page")
    public String viewAccountPage() {
        return "account-profile";
    }
    @GetMapping("/role")
    public String viewRolePage() {
        return "role-page";
    }
    @GetMapping("/company-profile")
    public String viewCompanyProfilePage() {
        return "company-profile";
    }
    @GetMapping("/create-capstone")
    public String viewCreateCapstonePage() {
        return "create-capstone";
    }
    @GetMapping("/edit-capstone")
    public String viewEditCapstonePage() {
        return "edit-capstone";
    }
    @GetMapping("/edit-company-profile")
    public String viewCompanyEditProfile() {
        return "company-edit-profile";
    }

}
