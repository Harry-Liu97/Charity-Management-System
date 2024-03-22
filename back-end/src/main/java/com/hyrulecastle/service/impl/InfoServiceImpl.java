package com.hyrulecastle.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.entity.Info;
import com.hyrulecastle.mapper.InfoMapper;
import com.hyrulecastle.service.InfoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author Honggang Zhang
 * @since 2023-06-26
 */
@Service
public class InfoServiceImpl extends ServiceImpl<InfoMapper, Info> implements InfoService {

    @Resource
    private InfoMapper infoMapper;

    @Override
    public IPage myPagingQuery(Page<Info> page, Wrapper wrapper) {
        return infoMapper.myPagingQuery(page, wrapper);
    }
}
