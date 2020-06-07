package com.suren.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/6/7 14:30
 **/
@Mapper
@Repository
public interface DeleteNoteDao {
    int deleteNote(Integer noteid);
}
