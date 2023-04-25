package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.Entity.GroupEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface GroupService {
    void saveGroup(GroupEntity groupEntity);
    List<GroupEntity> getAllGroup();
}
