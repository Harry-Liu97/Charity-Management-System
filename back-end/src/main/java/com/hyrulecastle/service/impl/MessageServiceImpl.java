package com.hyrulecastle.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Message;
import com.hyrulecastle.mapper.MessageMapper;
import com.hyrulecastle.service.MessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author Honggang Zhang
 * @since 2023-07-17
 */
@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements MessageService {

    @Resource
    private MessageMapper messageMapper;

    @Override
    public IPage myPagingQuery(Page<Message> page, Wrapper wrapper) {
        return messageMapper.myPagingQuery(page, wrapper);
    }
}
