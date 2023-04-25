package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.Entity.GroupEntity;
import com.example.EEET2580_Group.Service.Interface.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.EEET2580_Group.Repository.GroupRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class GroupServiceImp implements GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Override
    public void saveGroup(GroupEntity groupEntity) {
        groupRepository.save(groupEntity);
    }

//    @Override
//    public List<GroupEntity> getAllGroup() {
//        return groupRepository.findAll();
//    }

    @Override
    public Page<GroupEntity> getAllGroup(String groupName, Pageable page) {
        return groupName.isEmpty()?groupRepository.findAll(page):
                                    groupRepository.findByGroupName(groupName,page);
    }


}
