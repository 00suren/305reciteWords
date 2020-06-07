package com.suren.service;

import com.suren.entities.CommonResult;
import com.suren.entities.User;

public interface AdduserInfoService {

    CommonResult<User> addUserInfo(User user);
}
