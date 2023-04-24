package com.example.EEET2580_Group.Service.Interface;

import com.example.EEET2580_Group.Entity.GroupEntity;

import java.util.List;

public interface GroupService {
    void saveGroup(GroupEntity groupEntity);
    List<GroupEntity> getAllGroup();
}
