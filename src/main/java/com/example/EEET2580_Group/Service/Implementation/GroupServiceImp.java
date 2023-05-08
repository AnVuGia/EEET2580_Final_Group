package com.example.EEET2580_Group.Service.Implementation;

import com.example.EEET2580_Group.DTO.GroupDto;
import com.example.EEET2580_Group.DTO.StudentAccDto;
import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.GroupEntity;
import com.example.EEET2580_Group.Entity.StudentAcc;
import com.example.EEET2580_Group.Repository.CapstoneProjectRepository;
import com.example.EEET2580_Group.Repository.StudentAccRepository;
import com.example.EEET2580_Group.Service.Interface.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.EEET2580_Group.Repository.GroupRepository;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GroupServiceImp implements GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private CapstoneProjectRepository capstoneProjectRepository;

    @Autowired
    private StudentAccRepository studentAccRepository;

    @Override
    public void saveGroup(GroupDto groupDto) {
        List<StudentAcc> studentList = new ArrayList<>(groupDto.getStudentList().size());

        if (groupDto.getStudentList() ==null){
            this.groupRepository.delete(this.groupRepository.findById(groupDto.getId()).get());
        }else {

            for (StudentAccDto i : groupDto.getStudentList()) {
                StudentAcc tempStudent = this.studentAccRepository.findByUsername(i.getUsername());
                studentList.add(tempStudent);
            }
            GroupEntity toBeSaved = new GroupEntity();
            toBeSaved.setStudentAccList(studentList);
            toBeSaved.setGroupName(groupDto.getGroupName());
            groupRepository.save(toBeSaved);
            //update the group_id for new member
            GroupEntity temp = this.groupRepository.getLatestGroupEntity();
            for (StudentAccDto i : groupDto.getStudentList()) {
                StudentAcc tempStudent = this.studentAccRepository.findByUsername(i.getUsername());
                tempStudent.setGroup(temp);
            }
        }
    }

    @Override
    public void updateGroup(GroupDto groupDto) {
        List<StudentAcc> studentNewList = new ArrayList<>(groupDto.getStudentList().size());
        GroupEntity group = this.groupRepository.findById(groupDto.getId()).get();
        if (studentNewList.size() == 0){
            List<StudentAcc> tempStudent = this.studentAccRepository
                        .findByGroup(this.groupRepository.findById(groupDto.getId()).get());
            for (StudentAcc i : tempStudent){
                i.setGroup(null);
            }
            groupRepository.deleteById(groupDto.getId());
            return;
        }
        for (StudentAccDto i : groupDto.getStudentList()){
            StudentAcc tempStudent = this.studentAccRepository.findByUsername(i.getUsername());
            studentNewList.add(tempStudent);
        }
        //oldGroup
        //update group for student if they left
        for (StudentAcc i : group.getStudentAccList()){
            if (!studentNewList.contains(i)){
               i.setGroup(null);
            }
        }
        GroupEntity toBeSaved = new GroupEntity();
        toBeSaved.setStudentAccList(studentNewList);
        toBeSaved.setGroupName(groupDto.getGroupName());
        toBeSaved.setCapstoneId(
                this.capstoneProjectRepository.findById(groupDto.getCapstone().getId()).get());
        groupRepository.save(toBeSaved);
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
    @Override
    public GroupEntity findGroupById(Long id){
        return this.groupRepository.findById(id).get();
    }
}
