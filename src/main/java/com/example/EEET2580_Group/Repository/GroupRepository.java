package com.example.EEET2580_Group.Repository;

import com.example.EEET2580_Group.Entity.CapstoneProject;
import com.example.EEET2580_Group.Entity.GroupEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long> {

    @Query("SELECT g FROM GroupEntity g ORDER BY g.groupName ASC ")
    Page<GroupEntity> findAll(Pageable page);

    @Query("SELECT g FROM GroupEntity g WHERE g.id = (SELECT MAX(g2.id) FROM GroupEntity g2)")
    GroupEntity getLatestGroupEntity();

    @Query("SELECT g FROM GroupEntity g WHERE g.groupName LIKE %:groupName%")
    Page<GroupEntity> findByGroupName(@Param("groupName") String groupName, Pageable page);

    @Query("SELECT g FROM GroupEntity g WHERE g.capstoneId.id = :capstone_id")
    Page<GroupEntity> findByCapstoneId(@Param("capstone_id") Long capstoneProjectId, Pageable page);
}
