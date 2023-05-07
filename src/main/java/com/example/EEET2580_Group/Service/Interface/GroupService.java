package com.example.EEET2580_Group.Service.Interface;
import com.example.EEET2580_Group.Entity.GroupEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public interface GroupService {
    void saveGroup(GroupEntity groupEntity);
    Page<GroupEntity> getAllGroup(String groupName, Pageable page);

    GroupEntity findGroupById(Long id);
}
