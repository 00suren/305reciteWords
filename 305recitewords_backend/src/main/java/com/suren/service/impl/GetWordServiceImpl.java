package com.suren.service.impl;

import com.suren.dao.GetWordsDao;
import com.suren.entities.CommonResult;
import com.suren.entities.Word;
import com.suren.service.GetWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @Description: 随机获取单词和查询单词的service
 * @Author: 00suren
 * @Date: 2020/5/16 21:36
 **/
@Service
public class GetWordServiceImpl implements GetWordService {

    @Autowired
    GetWordsDao getWordsDao;

    @Override
    public CommonResult<Word> getWordsByContent(String content) {
        Word word = getWordsDao.getWordsByContent(content);
        if (word == null){
            return new CommonResult<Word>(200,"未查询到该单词。",null);
        }
        else{
            return new CommonResult<Word>(200,"查询单词成功",word);
        }
    }

    @Override
    public CommonResult<ArrayList<Word>> pushWords() {
        ArrayList<Word> words = getWordsDao.pushWords();
        return new CommonResult<ArrayList<Word>>(200,"推送单词成功",words);
    }
}
