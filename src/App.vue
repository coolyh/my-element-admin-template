<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>
<style>
    .el-popover {
        padding: 24px;
        /*width: 180px !important;*/
    }
    .report-tabs{

    }
    .report-tabs .el-tabs__nav{
        width:40%;
        margin: 0 auto;
        float: none !important;
        /*padding-bottom: 20px;*/
    }
    .report-tabs .el-tabs__nav .el-tabs__item{
        font-size: 20px;
        width: 50%;
        text-align: center;
        margin-bottom: 20px;
    }
    .el-table__footer-wrapper td{
        border: none;
    }
    .gth-table .el-table__footer-wrapper td{
        text-align: center !important;
    }
    .qy-table .el-table__footer-wrapper td{
        text-align: center !important;
    }
    .mx-table .el-table__footer-wrapper td{
        text-align: center !important;
    }
    span.total_amount{
        font-size: 20px;
        color: red;
    }
    .total-tr td{
        text-align: center;
        background-color: #F5F7FA !important;
    }
    .second-title-time{
        color: #333;
        /*font-weight: bold;*/
    }
    .total-sum{
        font-weight: bold !important;
    }
</style>
