package com.example.EEET2580_Group.Service.Implementation;

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
        Account searchedAcc = this.getAuthUser(username,password);

       if (searchedAcc instanceof AdminAcc) {
            return "admin-main-page";
       }else if (searchedAcc instanceof StudentAcc){
            return "student-main-page";
       }else if (searchedAcc instanceof CompanyAcc) {
            return "company-main-page";
       }else if (searchedAcc instanceof SupervisorAcc) {
            return "supervisor-main-page";
       }
        return null;
    }

    @Override
    public Account getAuthUser(String username, String password){
        if (adminAccRepository.findByUsernameAndPassword(username,password)!=null) {
            return adminAccRepository.findByUsernameAndPassword(username,password);
        }else if (studentAccRepository.findByUsernameAndPassword(username,password)!=null){
            return studentAccRepository.findByUsernameAndPassword(username,password);
        }else if (companyAccRepository.findByUsernameAndPassword(username,password)!=null){
            return companyAccRepository.findByUsernameAndPassword(username,password);
        }else if (supervisorAccRepository.findByUsernameAndPassword(username,password)!=null){
            return supervisorAccRepository.findByUsernameAndPassword(username,password);
        }
        return null;
    }
}
