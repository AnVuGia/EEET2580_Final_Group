package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.AccountDto;
import com.example.EEET2580_Group.Entity.Account;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    String authenticate(String username, String password);

    AccountDto getAuthUser(String username, String password);
}
