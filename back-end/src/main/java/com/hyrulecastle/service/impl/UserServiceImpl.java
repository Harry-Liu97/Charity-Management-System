package com.hyrulecastle.service.impl;

import com.hyrulecastle.entity.User;
import com.hyrulecastle.mapper.UserMapper;
import com.hyrulecastle.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource
    private UserMapper userMapper;

}
