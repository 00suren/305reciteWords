package com.suren.service;

import com.suren.entities.CommonResult;
import com.suren.entities.User;
import com.suren.entities.Word;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

public interface GetWordService {
    //查询单词
    CommonResult<Word> getWordsByContent(@Param("content") String content);

    CommonResult<ArrayList<Word>> pushWords();

}
