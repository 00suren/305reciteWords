package com.suren.dao;

import com.suren.entities.GetWordsResult;
import com.suren.entities.Word;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface GetWordsDao {

    //查询单词
    Word getWordsByContent(String content);
}
