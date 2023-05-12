package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.AccountDto;
import com.example.EEET2580_Group.Entity.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {
    // AccountService interface
    void saveAccount(Account account);
    Account getAccountById(Long id, String type);
    List<Account> getAllAccounts();
    List<StudentAcc> getAllStudentAccounts();
    List<SupervisorAcc> getAllSupervisorAccounts();
    List<CompanyAcc> getAllCompanyAccounts();
    List<GroupEntity> getAllGroups();
    Account getAccountByUsername(String username, String type);

    boolean isValidUsername(String username);



}
