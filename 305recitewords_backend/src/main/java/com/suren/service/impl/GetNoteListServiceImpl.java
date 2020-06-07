package com.suren.service.impl;

import com.suren.dao.GetNoteListDao;
import com.suren.entities.CommonResult;
import com.suren.entities.Note;
import com.suren.service.GetNoteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @Description: 获取用户的所有笔记
 * @Author: 00suren
 * @Date: 2020/6/7 15:59
 **/
@Service
public class GetNoteListServiceImpl implements GetNoteListService {

    @Autowired
    GetNoteListDao getNoteListDao;

    @Override
    public CommonResult<ArrayList<Note>> getNoteList(String wxid) {
        return new CommonResult<ArrayList<Note>>(200,"查询笔记成功",getNoteListDao.getNoteList(wxid));
    }
}
