package com.suren.dao;

import com.suren.entities.Word;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface GetWordsDao {

    //查询单词
    Word getWordsByContent(String content);

    //随机推送单词
    ArrayList<Word> pushWords();
}
