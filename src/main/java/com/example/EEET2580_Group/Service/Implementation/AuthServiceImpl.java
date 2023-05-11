package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.DTO.AccountDto;
import com.example.EEET2580_Group.DTO.CompanyAccDto;
import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.DTO.SupervisorAccDto;
import com.example.EEET2580_Group.Entity.*;
import com.example.EEET2580_Group.Repository.AdminAccRepository;
import com.example.EEET2580_Group.Repository.CompanyAccRepository;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Repository.SupervisorAccRepository;
import com.example.EEET2580_Group.Service.Interface.AuthService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {
    @Autowired
    private CompanyAccRepository companyAccRepository;
    @Autowired
    private SupervisorAccRepository supervisorAccRepository;
    @Autowired
    private StudentAccRepository studentAccRepository;
    @Autowired
    private AdminAccRepository adminAccRepository;
    @Override
    public String authenticate(String username, String password) {
        AccountDto searchedAcc = this.getAuthUser(username,password);
        System.out.println(searchedAcc.toString());
       if (searchedAcc instanceof AccountDto) {
            return "admin-main-page";
       }else if (searchedAcc instanceof StudentAccDto){
            return "student-main-page";
       }else if (searchedAcc instanceof CompanyAccDto) {
            return "company-main-page";
       }else if (searchedAcc instanceof SupervisorAccDto) {
            return "supervisor-main-page";
       }
        return null;
    }

    @Override
    public AccountDto getAuthUser(String username, String password){
        if (adminAccRepository.findByUsernameAndPassword(username,password)!=null) {
            return new AccountDto(adminAccRepository.findByUsernameAndPassword(username,password));
        }else if (studentAccRepository.findByUsernameAndPassword(username,password)!=null){
            return new StudentAccDto(studentAccRepository.findByUsernameAndPassword(username,password));
        }else if (companyAccRepository.findByUsernameAndPassword(username,password)!=null){
            return new CompanyAccDto(companyAccRepository.findByUsernameAndPassword(username,password));
        }else if (supervisorAccRepository.findByUsernameAndPassword(username,password)!=null){
            return new SupervisorAccDto(supervisorAccRepository.findByUsernameAndPassword(username,password));
        }
        return null;
    }
}
