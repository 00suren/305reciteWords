package com.suren.service.impl;

import com.suren.dao.GetWordsDao;
import com.suren.entities.Word;
import com.suren.service.GetWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description: 随机获取单词的service
 * @Author: 00suren
 * @Date: 2020/5/16 21:36
 **/
@Service
public class GetWordServiceImpl implements GetWordService {

    @Autowired
    GetWordsDao getWordsDao;

    @Override
    public Word getWordsByContent(String content) {
        return getWordsDao.getWordsByContent(content);
    }
}
