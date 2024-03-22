package com.hyrulecastle.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Record;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
public interface RecordService extends IService<Record> {

    IPage myPagingQuery(Page<Record> page, Wrapper wrapper);
}
