package com.hyrulecastle.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Message;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author Honggang Zhang
 * @since 2023-07-17
 */
public interface MessageService extends IService<Message> {

    IPage myPagingQuery(Page<Message> page, Wrapper wrapper);
}
