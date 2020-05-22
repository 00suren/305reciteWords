package com.suren.dao;

import com.suren.entities.Note;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AddNoteDao{
    int addNote(@Param("note") Note note);
}
