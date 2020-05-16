package com.suren.service;

import com.suren.entities.Word;
import org.apache.ibatis.annotations.Param;

public interface GetWordService {
    //查询单词
    Word getWordsByContent(@Param("content") String content);
}
