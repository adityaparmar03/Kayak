

var barChartQuery = "Select pageid as PageName ,count(*) as  NoClicks from  kayak.click_tracker group by pageid";

var pieChartQuery = "Select  pageid as PageName ,count(userid) as  NoClicks from  kayak.click_tracker group by pageid";

var histogramQuery = "Select  userid as UserID,count(*) as  NoClicks from  kayak.click_tracker group by userid";

var donutChartQuery = "select DATEDIFF(eventTime2 , eventTime1) as Time from \n" +
    "(SELECT  pages1.pageId pageId1, pages2.rank rank2 , pages2.pageId pageId2, pages2.eventTime eventTime2, pages1.eventTime eventTime1 FROM \n" +
    "(select @rownum:=@rownum+1 'rank', p.* from (SELECT * FROM kayak.click_tracker where eventTime is not null) p, (SELECT @rownum:=0) r order by eventTime) pages1\n" +
    "left join\n" +
    "(select @rownum2:=@rownum2+1 'rank', p.* from (SELECT * FROM kayak.click_tracker where eventTime is not null) p, (SELECT @rownum2:=0) r order by eventTime) pages2\n" +
    "on pages1.rank= (pages2.rank+1)) a\n" +
    "where pageId1<>pageId2";

var top5CarChart = "select count(target_name) as CNT,target_name as TargetName from billing where booking_type='CAR' group by target_name order by  1 desc limit 5";

var top5FlightChart = "select count(target_id) as CNT,target_id as TargetName from billing where booking_type='FLIGHT' group by target_id order by  1 desc limit 5";

var top5HotelChart = "select count(target_name) as CNT,target_name as TargetName from billing where booking_type='HOTEL' group by target_name order by  1 desc limit 5";

var top5Chart = "select count(IFNULL(target_name,target_id)) as CNT,IFNULL(target_name,target_id) as TargetName from billing group by IFNULL(target_name,target_id) order by  1 desc limit 5";

var wordTree = "select pageNav as PageNav from kayak.click_tracker where pageNav is not null";


exports.barChartQuery = barChartQuery;
exports.pieChartQuery = pieChartQuery;
exports.histogramQuery = histogramQuery;
exports.donutChartQuery = donutChartQuery;
exports.top5CarChart = top5CarChart;
exports.top5FlightChart = top5FlightChart;
exports.top5HotelChart = top5HotelChart;
exports.top5Chart = top5Chart;
exports.wordTree = wordTree;