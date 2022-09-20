<template>
    <div>
        <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                <div class="updateinfo">
                    <div class="left">
                        <el-form-item label="头像" prop="avatar">
                            <el-upload class="avatar-uploader" action="http://localhost:8888/app/upload"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="form.avatar" style="width:150px;height:110px" :src="form.avatar"
                                    class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <!-- <el-form-item label="头像" prop="avatar">
                            <img style="width:150px;height:110px" :src="form.avatar" />
                        </el-form-item> -->
                        <el-form-item label="账号密码" prop="password">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nikeName">
                            <el-input v-model="form.nikeName"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model="form.age"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-switch v-model="form.gender" active-color="#13ce66" inactive-color="#ff4949"
                                active-text="男" inactive-text="女" :active-value="1" :inactive-value="0">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>

                    </div>
                    <div class="right">
                        <el-form-item label="用户编号" prop="id">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="账号" prop="account">
                            <el-input v-model="form.account" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="地区" prop="city">
                            <el-input v-model="form.city"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="兴趣爱好" prop="hobby">
                            <el-input v-model="form.hobby"></el-input>
                        </el-form-item>-->
                        <el-form-item label="出生日期" prop="birthDate">
                            <el-date-picker v-model="form.birthDate" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="个性签名" prop="signature">
                            <el-input v-model="form.signature"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { userInfo, updateUser } from "@/api/user.js";

export default {
    name: "PersonalDia",
    data() {
        return {
            dialogVisible: false,
            form: {
                avatar: "",
                password: "",
                nikeName: "",
                age: Number,
                email: "",
                phone: "",
                sex: Number,
                id: Number,
                account: "",
                city: "",
                signature: "",
                birthDate: ""
            },
            rules: {
                nickname: [
                    { required: true, message: "昵称不能为空", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "账号密码不能为空", trigger: "blur" },
                ],
            },
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res)
            this.form.avatar = res.data
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        open() {
            this.dialogVisible = true;
        },
        load() {
            userInfo(this.$store.state.id)
                .then((res) => {
                    Object.assign(this.form, res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        submit() {
            let date = new Date(this.form.birthDate)
            this.form.birthDate = date.getTime()
            console.log(this.form.birthDate)
            updateUser(this.$store.state.token, this.form)
                .then((res) => {
                    this.dialogVisible = false;
                    this.$emit("flesh");
                    this.$message({ message: '修改成功', type: 'success', showClose: true })
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleClose() {
            this.dialogVisible = false;
            this.$emit("flesh");
        },
    },
};
</script>

<style scoped>
.updateinfo {
    height: 350px;
    overflow: auto;
}

.left {
    /* width: 330px; */
    float: left;
}

.right {
    overflow: hidden;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
