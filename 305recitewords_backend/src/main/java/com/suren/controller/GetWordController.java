package com.suren.controller;

import com.suren.entities.GetWordsResult;
import com.suren.entities.Word;
import com.suren.service.GetWordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/5/16 21:39
 **/
@RestController
@Slf4j
public class GetWordController {

    @Autowired
    GetWordService getWordService;

    @GetMapping("/word/get/{content}")
    private GetWordsResult getWordByCount(@PathVariable("content") String content) {
        Word word = getWordService.getWordsByContent(content);

        return new GetWordsResult(200,"查询单词成功",word);
    }
}
