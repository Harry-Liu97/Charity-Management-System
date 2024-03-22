package com.hyrulecastle.config;

import lombok.Data;

import java.util.HashMap;

/**
 * ClassName: QueryPageParam
 * Package: com.hyrulecastle.config
 * Description:
 * Encapsulation of paging parameters
 * @Author: Honggang Zhang
 * @Create: 22/6/2023 6:37 pm
 * @Version: 1.0
 */
@Data
public class QueryPageParam {
    private static int PAGE_SIZE = 20;  // Default capacity per page
    private static int PAGE_NUM = 1;    // Default page number

    private int pageSize = PAGE_SIZE;
    private int pageNum = PAGE_NUM;

    private HashMap params = new HashMap(); // Data
}
