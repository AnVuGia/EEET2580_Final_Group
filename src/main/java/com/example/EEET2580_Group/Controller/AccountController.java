package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.AccountDto;
import com.example.EEET2580_Group.DTO.CapstoneProjectDto;
import com.example.EEET2580_Group.DTO.CompanyAccDto;
import com.example.EEET2580_Group.Entity.Account;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Service.Interface.AccountService;
import com.example.EEET2580_Group.Service.Interface.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/companies")
    List<CompanyAccDto> getAllCompanies() {
        System.out.println("getAllAccounts in AccountController");
        List<CompanyAcc> companies = accountService.getAllCompanyAccounts();
        List<CompanyAccDto> dtoConvert = companies.stream()
                .map(account -> new CompanyAccDto(account)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/supervisors")
    List<AccountDto> getAllSupervisor() {
        System.out.println("getAllAccounts in AccountController");
        List<SupervisorAcc> supervisors = accountService.getAllSupervisorAccounts();
        List<AccountDto> dtoConvert = supervisors.stream()
                .map(account -> new AccountDto(account)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/students")
    List<AccountDto> getAllStudents() {
        System.out.println("getAllAccounts in AccountController");
        List<StudentAcc> students = accountService.getAllStudentAccounts();
        List<AccountDto> dtoConvert = students.stream()
                .map(account -> new AccountDto(account)).collect(Collectors.toList());
        return dtoConvert;
    }

    @GetMapping("/company/{id}")
    Account getAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "company");
        return account;
    }

    @GetMapping("/company/username/{username}")
    public Account getAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "company");
        return account;
    }

    @PostMapping("/{type}/add")
    public Account addAccount(@RequestBody Account request, @PathVariable String type) {
        Account account = new Account();
        account.setName(request.getName());
        account.setUsername(request.getUsername());
        account.setPassword(request.getPassword());
        account.setEmail(request.getEmail());

        if (!accountService.isValidUsername(request.getUsername())) {
            System.out.println("user name is already taken");
            return null;
        }

        if (type.equals("company")) {
            CompanyAcc companyAcc = new CompanyAcc();
            companyAcc.setAccount(account);
            accountService.saveAccount(companyAcc);
            return companyAcc;
        } else if (type.equals("supervisor")) {
            SupervisorAcc supervisorAcc = new SupervisorAcc();
            supervisorAcc.setAccount(account);
            accountService.saveAccount(supervisorAcc);
            return supervisorAcc;
        } else if (type.equals("student")) {
            StudentAcc studentAcc = new StudentAcc();
            studentAcc.setAccount(account);
            accountService.saveAccount(studentAcc);
            return studentAcc;
        }
        return null; // handle invalid type
    }
    // Student Controller
    // @GetMapping("/students")
    // List<StudentAcc> getAllStudentAccounts() {
    // System.out.println("getAllStudentAccounts in AccountController");
    // List<StudentAcc> accounts = accountService.getAllStudentAccounts();
    // return accounts;
    // }

    @GetMapping("/student/id/{id}")
    Account getStudentAccountById(@PathVariable Long id) {
        Account account = accountService.getAccountById(id, "student");
        return account;
    }

    @GetMapping("/student/username/{username}")
    Account getStudentAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "student");
        return account;
    }

    @GetMapping("/supervisor/all")
    List<SupervisorAcc> getAllSupervisorAccounts() {
        System.out.println("getAllSupervisorAccounts in AccountController");
        List<SupervisorAcc> accounts = accountService.getAllSupervisorAccounts();
        return accounts;
    }

    @GetMapping("/supervisor/username/{username}")
    Account getSupervisorAccountByUsername(@PathVariable String username) {
        Account account = accountService.getAccountByUsername(username, "supervisor");
        return account;
    }

}
