<template>
    /**
        on-preview 点击文件列表中已上传的文件时的钩子函数
        on-remove	文件列表移除文件时的钩子
        on-success	文件上传成功时的钩子
        on-error	文件上传失败时的钩子
        on-progress	文件上传时的钩子
        on-exceed	文件超出个数限制时的钩子
        before-remove	删除文件之前的钩子，参数为上传的文件和文件列表，
                        若返回 false 或者返回 Promise 且被 reject，则停止删除。
        file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]

    */
    <el-upload class="img_upload" ref="upload" action="http://localhost:8080/api/covers"
        :on-preview="handlePreview"  
        :on-remove="handleRemove" :before-remove="beforeRemove"
        :on-success="handleSuccess" multiple :limit="1" :on-exceed="handleExceed"
        :file-list="fileList"
    >  
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload_tip">大小不超过500kb</div>
    </el-upload>
</template>

<script>
    export default{
        name: 'ImgUpload',
        data(){
            return{
                fileList:[],
                url:''
            }
        },
        methods:{ /** 对应上面所写的钩子函数 */
            handleRemove(file, fileList){},
            handlePreview(file){},
            handleExceed(files,fileList){
                this.$message.warning('当前选择了${files.length}个文件，共选择${files.length+fileList.length}个文件')
            },
            beforeRemove(file,fileList){
                return this.$confirm('确定移除${file.name}?')
            },
            handleSuccess(response){
                this.url = response
                this.$emit('onUpload')
                this.$message.warning('上传成功')
            },
            clear(){
                this.$refs.upload.clearFiles()
            }
        }
    }
</script>