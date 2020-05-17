package com.suren.controller;

import com.suren.entities.CommonResult;
import com.suren.entities.Word;
import com.suren.service.GetWordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * @Description: TODO
 * @Author: 00suren
 * @Date: 2020/5/16 21:39
 **/
@RestController
@Slf4j
@Validated
public class GetWordController {

    @Autowired
    GetWordService getWordService;

    @GetMapping("/word/get/{content}")
    public CommonResult<Word> getWordByCount( @PathVariable("content") String content) {
        return getWordService.getWordsByContent(content);
    }

    @GetMapping("word/push")
    public CommonResult<ArrayList<Word>> pushWords(){

        return getWordService.pushWords();
    }
}
