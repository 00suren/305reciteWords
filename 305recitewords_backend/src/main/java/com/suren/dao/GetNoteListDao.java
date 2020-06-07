package com.suren.dao;

import com.suren.entities.Note;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/6/7 14:31
 **/
@Mapper
@Repository
public interface GetNoteListDao {
    ArrayList<Note> getNoteList(String wxid);
}
