package com.example.EEET2580_Group.Controller;

import com.example.EEET2580_Group.DTO.CompanyAccDto;
import com.example.EEET2580_Group.Entity.CompanyAcc;
import com.example.EEET2580_Group.Service.Interface.CapstoneProjectService;
import com.example.EEET2580_Group.Service.Interface.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @Autowired
    CapstoneProjectService capstoneProjectService;


    @GetMapping("")
    public List<CompanyAcc> getAllCompany(){
        return companyService.findAll();
    }


    @GetMapping("/search")
    public Page<CompanyAccDto> getAllCompany (@RequestParam(name = "acc_name",defaultValue = "") String companyName,
                                          @RequestParam(name = "page",defaultValue = "0") String page,
                                          @RequestParam(name = "size",defaultValue = "6") String size,
                                          @RequestParam(name = "sort",defaultValue = "asc") String sort){
        Pageable pageable = null;
        if (sort.equals("desc")) {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").descending());
        } else {
            pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by("id").ascending());
        }
        Page<CompanyAcc> result =  companyService.getAllCompany(companyName, pageable);
        Page<CompanyAccDto> dtoConvert = result.map(object -> new CompanyAccDto(object));
        return dtoConvert;
    }

    @PutMapping(value = "/update/{id}")
    public void updateCompany(@PathVariable Long id,
                              @RequestBody CompanyAccDto companyAccDto){

        companyService.updateCompanyById(id, companyAccDto);
    }

}
