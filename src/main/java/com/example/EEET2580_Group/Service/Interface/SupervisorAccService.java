package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.DTO.SupervisorAccDto;
import com.example.EEET2580_Group.Entity.SupervisorAcc;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SupervisorAccService {
    List<SupervisorAcc> getAllSupervisor();

    void updateSupervisorById(Long id, SupervisorAccDto supervisorAccDto);
}
