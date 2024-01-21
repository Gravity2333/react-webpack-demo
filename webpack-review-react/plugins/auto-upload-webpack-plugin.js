const { NodeSSH } = require('node-ssh')

class AutoUploadWebpackPlugin {
    constructor({
        host, username, password, serverDir
    }) {
        this.host = host
        this.username = username
        this.password = password
        this.serverDir = serverDir
    }

    ssh = null
    outputPath = ''

    async _connectServer() {
        this.ssh = new NodeSSH()
        await this.ssh.connect({
            host: this.host,
            username: this.username,
            password: this.password
        })
        console.log('server connected！')
    }

    async _cleanServerDir(ssh) {
        await this.ssh.execCommand(`sudo chmod -R 777 ${this.serverDir}`)
        await this.ssh.execCommand(`sudo rm -rf ${this.serverDir}/*`)
    }

    async _uploadFiles() {
        const status = await this.ssh.putDirectory(this.outputPath, this.serverDir, {
            recursive: true,
            concurrency: 10,
        })
        if (status) {
            console.log('上传成功!')
        }
    }

    apply(compiler) {
        // 监听事件 在output输出之后 用afterEmit
        compiler.hooks.afterEmit.tapAsync("AutoUploadPlugin", async (compilation, callback) => {
            // 获取输出问文件夹路径
            this.outputPath = compilation.outputOptions.path
            console.log(this.outputPath)
            // 链接服务器 node-ssh 
            await this._connectServer()
            // 上传资源
            // 删除原有文件夹内容
            await this._cleanServerDir()
            // 完成所有操作 调用callback
            await this._uploadFiles()
            // 关闭ssh
            this.ssh.dispose()
            callback()
        })
    }
}

module.exports = AutoUploadWebpackPlugin