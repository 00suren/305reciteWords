package com.suren.dao;

import com.suren.entities.Note;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/6/7 14:30
 **/
@Repository
@Mapper
public interface PutNoteDao {
    int putNote(Note note);
}
