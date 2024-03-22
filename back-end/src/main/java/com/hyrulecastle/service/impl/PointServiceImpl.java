package com.hyrulecastle.service.impl;

import com.hyrulecastle.entity.Point;
import com.hyrulecastle.mapper.PointMapper;
import com.hyrulecastle.service.PointService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@Service
public class PointServiceImpl extends ServiceImpl<PointMapper, Point> implements PointService {

    @Resource
    private PointMapper pointMapper;

    @Override
    public List<Point> rank() {
        return pointMapper.rank();
    }
}
