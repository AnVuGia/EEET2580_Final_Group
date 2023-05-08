package com.example.EEET2580_Group.DTO;
import com.example.EEET2580_Group.Entity.GroupEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto {
    private Long id ;
    private String groupName;
    private List<StudentAccDto> studentList;
    private CapstoneProjectDto capstone;

    public GroupDto(GroupEntity group){
        this.id = group.getId();
        this.groupName = group.getGroupName();
        this.studentList =  group.getStudentAccList().stream()
                .map(account -> new StudentAccDto(account)).collect(Collectors.toList());
        this.capstone = group.getCapstoneId() == null? null: new CapstoneProjectDto(group.getCapstoneId());
    }
}
