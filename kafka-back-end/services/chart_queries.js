

var barChartQuery = "Select pageid as PageName ,count(*) as  NoClicks from  kayak.click_tracker group by pageid";

var pieChartQuery = "Select  pageid as PageName ,count(userid) as  NoClicks from  kayak.click_tracker group by pageid";

var histogramQuery = "Select  userid as UserID,count(*) as  NoClicks from  kayak.click_tracker group by userid";

var donutChartQuery = "Select  userid as UserID,count(*) as  NoClicks from  kayak.click_tracker group by userid";

var top5CarChart = "select count(target_name) as CNT,target_name as TargetName from billing where booking_type='CAR' group by target_name order by  1 desc limit 5";

var top5FlightChart = "select count(target_id) as CNT,target_id as TargetName from billing where booking_type='FLIGHT' group by target_id order by  1 desc limit 5";

var top5HotelChart = "select count(target_name) as CNT,target_name as TargetName from billing where booking_type='HOTEL' group by target_name order by  1 desc limit 5";

var top5Chart = "select count(IFNULL(target_name,target_id)) as CNT,IFNULL(target_name,target_id) as TargetName from billing group by IFNULL(target_name,target_id) order by  1 desc limit 5";


exports.barChartQuery = barChartQuery;
exports.pieChartQuery = pieChartQuery;
exports.histogramQuery = histogramQuery;
exports.donutChartQuery = donutChartQuery;
exports.top5CarChart = top5CarChart;
exports.top5FlightChart = top5FlightChart;
exports.top5HotelChart = top5HotelChart;
exports.top5Chart = top5Chart;