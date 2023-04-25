package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.SupervisorAcc;
import com.example.EEET2580_Group.Repository.SupervisorAccRepository;
import com.example.EEET2580_Group.Service.Interface.SupervisorAccService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SupervisorAccServiceImp implements SupervisorAccService {
    @Autowired
    SupervisorAccRepository supervisorAccRepository;


    @Override
    public List<SupervisorAcc> getAllSupervisor() {
        return supervisorAccRepository.getAllSupervisor();
    }
}
