<template>
    <div>
        <el-card>

        </el-card>
    </div>
</template>

<script>
import { userInfo } from "@/api/user.js";
export default {
    name: "Info",
    data() {
        return {
            avatar: String,
            account: String,
            age: Number,
            email: String,
            phone: String,
            city: String,
            createDate: Date,
            nikeName: String,
            sex: String,
            //work: String,
            //hobby: String,
            signature: String,
        };
    },
    created() {
        this.load();
    },
    mounted() {

    },
    methods: {
        load() {
            userInfo(this.$route.params.id)
                .then((res) => {
                    this.avatar = res.data.avatar;
                    this.account = res.data.account;
                    this.age = res.data.age;
                    this.email = res.data.email;
                    this.phone = res.data.phone;
                    this.city = res.data.city;
                    this.createDate = this.formatDate(res.data.birthDate);
                    this.nikeName = res.data.nikeName;
                    this.sex = res.data.sex == 1 ? "男" : res.data.sex == 2 ? "女" : "未知";
                    this.work = res.data.work;
                    this.signature = res.data.signature;
                    this.hobby = res.data.hobby;
                })
                .catch((err) => {
                    console.log(err);
                });
        },/**
     * 时间格式转换
     * 毫秒-xxxx-xx-xx xx:xx
     * */
        formatDate(time) {
            var date = new Date(time)
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? ('0' + m) : m
            var d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            var h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            var minute = date.getMinutes()
            var second = date.getSeconds()
            minute = minute < 10 ? ('0' + minute) : minute
            second = second < 10 ? ('0' + second) : second
            return y + '-' + m + '-' + d

        }

    },
};
</script>

<style scoped>
img {
    width: 150px;
    height: 150px;
}
</style>
