package com.suren.service.impl;

import com.suren.dao.AddUserInfoDao;
import com.suren.entities.CommonResult;
import com.suren.entities.User;
import com.suren.service.AdduserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description: 向数据库中添加用户信息
 * @Author: 00suren
 * @Date: 2020/6/7 10:58
 **/
@Service
public class AdduserInfoServiceImpl implements AdduserInfoService {

    @Autowired
    AddUserInfoDao addUserInfoDao;
    @Override
    public CommonResult<User> addUserInfo(User user) {
        int result = 0;
        try {
             result = addUserInfoDao.addUserInfo(user);
        }catch (Exception e){
            e.printStackTrace();
            result = 0;
        }

        System.out.println("result:"+result);
        if (result == 0){
            return new CommonResult<>(400, "插入用户信息失败", null);
        }
        return new CommonResult<>(200, "插入用户信息成功", null);
    }
}
