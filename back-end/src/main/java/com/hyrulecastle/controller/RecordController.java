package com.hyrulecastle.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.config.QueryPageParam;
import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Record;
import com.hyrulecastle.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * ClassName: RecordController
 * Package: com.hyrulecastle.controller
 * Description:
 * Record Controller
 *
 * @author Honggang Zhang
 * @since 2023-07-24
 */
@RestController
@RequestMapping("/record")
public class RecordController {

    @Autowired
    private RecordService recordService;

    /**
     * Add record
     * @param record
     * @return Result
     */
    @PostMapping("/add")
    public Result add(@RequestBody Record record) {
        return recordService.save(record) ? Result.success() : Result.fail();
    }

    /**
     * Paging query records based on user account.
     * @param queryPageParam
     * @return Result
     */
    @PostMapping("/pagingQuery")
    public Result PagingQuery(@RequestBody QueryPageParam queryPageParam){
        Page<Record> page = new Page<>();
        page.setCurrent(queryPageParam.getPageNum());
        page.setSize(queryPageParam.getPageSize());
        HashMap params = queryPageParam.getParams();
        String no = (String) params.get("no");
        LambdaQueryWrapper<Record> lambdaQueryWrapper = new LambdaQueryWrapper<>();

        if(StringUtils.isNotBlank(no) && !"null".equals(no)) {
            lambdaQueryWrapper.eq(Record::getNo, no);
        }

        IPage result = recordService.myPagingQuery(page, lambdaQueryWrapper);

        return Result.success(result.getRecords(), result.getTotal());
    }

    /**
     * List all records
     * @return Result
     */
    @GetMapping("/list")
    public Result list(){
        return Result.success(recordService.list());
    }
}
