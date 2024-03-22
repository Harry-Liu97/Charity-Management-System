package com.hyrulecastle.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.hyrulecastle.config.QueryPageParam;
import com.hyrulecastle.config.Result;
import com.hyrulecastle.entity.Message;
import com.hyrulecastle.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * ClassName: MessageController
 * Package: com.hyrulecastle.controller
 * Description:
 * Message Controller
 *
 * @author Honggang Zhang
 * @since 2023-07-17
 */
@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    /**
     * Add message
     * @param message
     * @return Result
     */
    @PostMapping("/add")
    public Result add(@RequestBody Message message) {
        return messageService.save(message) ? Result.success() : Result.fail();
    }

    /**
     * Delete message based on id
     * @param id
     * @return Result
     */
    @GetMapping("/del")
    public Result del(@RequestParam String id) {
        return messageService.removeById(id) ? Result.success() : Result.fail();
    }

    /**
     * Update message based on id
     * @param message
     * @return Result
     */
    @PostMapping("/update")
    public Result update(@RequestBody Message message) {
        return messageService.updateById(message) ? Result.success() : Result.fail();
    }

    /**
     * Pass in optional parameters for paging query
     * @param queryPageParam
     * @return Result
     */
    @PostMapping("pagingQuery")
    public Result PagingQuery(@RequestBody QueryPageParam queryPageParam){
        Page<Message> page = new Page<>();
        page.setCurrent(queryPageParam.getPageNum());
        page.setSize(queryPageParam.getPageSize());

        HashMap params = queryPageParam.getParams();
        String sender = (String) params.get("sender");
        String receiver = (String) params.get("receiver");
        String status = (String) params.get("status");
        String target = (String) params.get("target");

        LambdaQueryWrapper<Message> lambdaQueryWrapper = new LambdaQueryWrapper<>();

        if (StringUtils.isNotBlank(sender) && !"null".equals(sender)) {
            lambdaQueryWrapper.eq(Message::getSender, sender);
        }

        if (StringUtils.isNotBlank(receiver) && !"null".equals(receiver)) {
            lambdaQueryWrapper.eq(Message::getReceiver, receiver);
        }

        if (StringUtils.isNotBlank(status) && !"null".equals(status)) {
            lambdaQueryWrapper.eq(Message::getStatus, status);
        }

        if (StringUtils.isNotBlank(target) && !"null".equals(target)) {
            lambdaQueryWrapper.eq(Message::getTarget, target);
        }

        IPage result = messageService.myPagingQuery(page, lambdaQueryWrapper);

        return Result.success(result.getRecords(), result.getTotal());
    }

    /**
     * List all messages
     * @return
     */
    @GetMapping("/list")
    public Result list(){
        return Result.success(messageService.list());
    }
}