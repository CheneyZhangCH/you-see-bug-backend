## 本地开发环境

假设大家使用 macOS 开发，Linux 和 Windows 环境自行参考。

### 依赖列表

本项目的外部服务依赖有：

- 数据库：MySQL

### MySQL 5.7

```bash
$ brew install mysql@5.7
$ brew services start mysql
```

```bash
# 登录数据库
mysql -u root

> use mysql;
> update user set plugin='mysql_native_password' where user='root';
> quit;

# 重启 MySQL
brew services restart mysql
```

### 添加.env.local

在根目录下添加 .env.local文件
```env
TYPEORM_CONNECTION=your_database_type_ig_mysql
TYPEORM_DATABASE=your_database
TYPEORM_HOST=127.0.0.1_or_your_remote_ip
TYPEORM_PORT=your_port
TYPEORM_USERNAME=your_username
TYPEORM_PASSWORD=your_password
TYPEORM_ENTITIES=dist/**/*.entity{.ts,.js}
TYPEORM_MIGRATIONS=dist/db/migrations/*.js
TYPEORM_MIGRATIONS_DIR=dist/db/migrations
```
### mysql初始化

typeorm migration 初始化mysql
note: 本项目禁用了typeorm synchronize， 具体原因请自行google
```shell
pnpm migration:run:full:local
```
