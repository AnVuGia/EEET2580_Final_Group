package com.example.EEET2580_Group.Controller;
import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Service.Interface.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Controller
@RestController
public class AuthenticateController {
    @Autowired
    private AuthService authService;

    @GetMapping("/authenticate")
    public Account login(@RequestParam(name = "username") String username,
                        @RequestParam(name = "password") String password) {
        Account searchedAccount = authService.getAuthUser(username, password);
        if (searchedAccount == null){
            System.out.println("User not found");
            return null;
        }
        return searchedAccount;
    }
}
