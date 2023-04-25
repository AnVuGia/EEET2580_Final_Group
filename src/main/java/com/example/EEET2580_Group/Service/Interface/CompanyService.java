package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.Entity.CompanyAcc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CompanyService {

    Page<CompanyAcc> getAllCompany (String companyName, Pageable page);

    List<CompanyAcc> findAll();
}
