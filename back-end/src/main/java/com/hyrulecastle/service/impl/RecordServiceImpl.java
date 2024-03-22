package com.hyrulecastle.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Record;
import com.hyrulecastle.mapper.RecordMapper;
import com.hyrulecastle.service.RecordService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@Service
public class RecordServiceImpl extends ServiceImpl<RecordMapper, Record> implements RecordService {

    @Resource
    private RecordMapper recordMapper;

    @Override
    public IPage myPagingQuery(Page<Record> page, Wrapper wrapper) {
        return recordMapper.myPagingQuery(page, wrapper);
    }
}
