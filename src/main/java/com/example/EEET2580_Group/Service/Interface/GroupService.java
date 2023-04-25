package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.Entity.GroupEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroupService {
    void saveGroup(GroupEntity groupEntity);
    Page<GroupEntity> getAllGroup(String groupName, Pageable page);
}
